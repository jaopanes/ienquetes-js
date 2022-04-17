const { erro, ok } = require('../../../shared/helpers').returns
const { validationError } = require('../../../shared/errors')
const { token, hash } = require('../../../shared/utils')

module.exports = class Authenticate {
  #userRepository = null

  constructor({ userRepository }) {
    this.#userRepository = userRepository
  }

  errorUnauthorized() {
    return erro({
      code: 'UNAUTHORIZED',
      message: 'Erro ao autenticar usuário.',
      erros: ['Email ou senha inválidos.']
    })
  }

  async execute({ email, password }) {
    try {
      const userCreatedWithEmail = await this.#userRepository.findOneByEmail(email)
      if (!userCreatedWithEmail.data) return this.errorUnauthorized();

      const passwordMatch = hash.compare(password, userCreatedWithEmail.data.password)
      if (!passwordMatch) return this.errorUnauthorized()

      const secureUser = userCreatedWithEmail.data.secureReturn()
      const jwtToken = token.generate(secureUser)

      return ok({
        code: 'SUCCESS', data: {
          ...secureUser, token: jwtToken
        }
      });
    } catch (error) {
      console.log(error)

      if (error instanceof validationError) {
        return erro({ code: 'VALIDATION_INPUT', message: error.message, erros: error.erros })
      }

      return erro({ code: 'SERVICE', message: 'Foram encontrados erros ao autenticar.', erros: [error.message] })
    }
  }
}