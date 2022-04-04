const { User } = require('../models')
const { validationError, erro, ok } = require('../../../util')

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
      if (!name) {
        erros.push('Name fild is required')
      }
      if (!nickname) {
        erros.push('Nickname fild is required')
      }
      if (!email) {
        erros.push('Email fild is required')
      }
      if (!password) {
        erros.push('Password field is required')
      }
      if (!confirmPassword) {
        erros.push('Confirm password field is required')
      }
      if (password !== confirmPassword) {
        erros.push('Passwords do not match')
      }

      const userCreatedWithEmail = await this.#userRepository.findOneByEmail(email);
      if (userCreatedWithEmail.data) {
        return erro({
          code: 'VALIDATION_INPUT',
          message: 'There were validation errors',
          erros: ['User already registered with this email']
        })
      }

      const userCreatedWithNickname = await this.#userRepository.findOneByNickname(nickname);
      if (userCreatedWithNickname.data) {
        return erro({
          code: 'VALIDATION_INPUT',
          message: 'There were validation errors',
          erros: ['User already registered with this nickname']
        })
      }

      if (erros.length > 0) {
        throw new validationError('There were validation errors', erros)
      }

      const user = new User({
        name,
        nickname,
        email,
        password
      }).hashPassword()

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