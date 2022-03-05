const User = require('../../models/User')
const { httpErro, httpOk, ValidationError } = require('../../common')

module.exports = class CreateSurveyService {
  #userRepository = null

  constructor({ userRepository }) {
    this.#userRepository = userRepository
  }

  /**
   * @param {string} title
   * @param {string} initiatedAt
   * @param {string} endedAt
   * @param {array} options
   */
  async execute({ name, nickname, email, password, confirmPassword }) {
    try {
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

      return httpOk({ status: 201, data: user })
    } catch (error) {
      console.log(error)

      if (error instanceof ValidationError) {
        return httpErro({ status: 400, code: 'VALIDATION_INPUT', message: error.message, erros: error.erros })
      }

      return httpErro({ status: 500, code: 'SERVICE_1', message: 'There was an error entering the record', erros: [error.message] })
    }
  }
} 