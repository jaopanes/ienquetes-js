const User = require('../../models/User')
const { httpErro, httpOk, ValidationError } = require('../../common')

module.exports = class CreateSurveyService {
  #userRepository = null

  constructor({ userRepository }) {
    this.#userRepository = userRepository
  }

  /**
   * @param {string} name
   * @param {string} nickname
   * @param {string} email
   * @param {string} password
   * @param {string} confirmPassword
   */
  async execute({ name, nickname, email, password, confirmPassword }) {
    const erros = []

    try {
      if (!confirmPassword) {
        erros.push('Confirm password field is required')
      }
      if (password !== confirmPassword) {
        erros.push('Passwords do not match')
      }

      const user = new User({
        name,
        nickname,
        email,
        password
      })

      const userCreate = await this.#userRepository.insert(user)

      if (!userCreate.ok) {
        return httpErro({
          status: 500,
          code: userCreate.code,
          message: userCreate.message,
          erros: userCreate.erros
        })
      }

      if (erros.length > 0) {
        throw new ValidationError('There were validation errors', erros)
      }

      return httpOk({ status: 201, data: user.secureReturn() })
    } catch (error) {
      console.log(error)

      if (error instanceof ValidationError) {
        return httpErro({ status: 400, code: 'VALIDATION_INPUT', message: error.message, erros: error.erros })
      }

      return httpErro({ status: 500, code: 'SERVICE_1', message: 'There was an error entering the record', erros: [error.message] })
    }
  }
} 