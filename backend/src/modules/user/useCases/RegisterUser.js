const User = require('../models/User')
const { validationError, erro, ok } = require('../../../common')

module.exports = class RegisterUser {
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

      const userCreatedWithEmail = await this.#userRepository.findOneByEmail(email);
      if(userCreatedWithEmail.data) {
        erros.push('User already registered with this email')
      }

      const userCreatedWithNickname = await this.#userRepository.findOneByNickname(nickname);
      if(userCreatedWithNickname.data) {
        erros.push('User already registered with this nickname')
      }

      if (erros.length > 0) {
        throw new validationError('There were validation errors', erros)
      }

      const user = new User({
        name,
        nickname,
        email,
        password
      })

      const userCreate = await this.#userRepository.insert(user)

      if (!userCreate.ok) {
        return erro({
          code: userCreate.code,
          message: userCreate.message,
          erros: userCreate.erros
        })
      }

      return ok({ code: "CREATED", data: user.secureReturn() })
    } catch (error) {
      console.log(error)

      if (error instanceof validationError) {
        return erro({ code: 'VALIDATION_INPUT', message: error.message, erros: error.erros })
      }

      return erro({ code: 'SERVICE', message: 'There was an error entering the record', erros: [error.message] })
    }
  }
} 