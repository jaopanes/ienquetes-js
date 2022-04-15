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
        erros.push('Nome é obrigatório.')
      }
      if (!nickname) {
        erros.push('Usuário é obrigatório.')
      }
      if (!email) {
        erros.push('Email é obrigatório.')
      }
      if (!password) {
        erros.push('Senha é obrigatória.')
      }
      if (!confirmPassword) {
        erros.push('Confirmação de senha é obrigatória.')
      }
      if (password !== confirmPassword) {
        erros.push('Senhas não conferem.')
      }

      const userCreatedWithEmail = await this.#userRepository.findOneByEmail(email);
      if (userCreatedWithEmail.data) {
        return erro({
          code: 'VALIDATION_INPUT',
          message: 'Foram encontrados erros de validação.',
          erros: ['Já existem registros com esse email.']
        })
      }

      const userCreatedWithNickname = await this.#userRepository.findOneByNickname(nickname);
      if (userCreatedWithNickname.data) {
        return erro({
          code: 'VALIDATION_INPUT',
          message: 'Foram encontrados erros de validação.',
          erros: ['Já existem registros com esse usuário.']
        })
      }

      if (erros.length > 0) {
        throw new validationError('Foram encontrados erros de validação.', erros)
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

      return erro({ code: 'SERVICE', message: 'Foram encontrados erros ao fazer registro.', erros: [error.message] })
    }
  }
} 