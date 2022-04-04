const { erro, hash, ok, validationError } = require('../../../util')

module.exports = class Authenticate {
  #userRepository = null
  #token = null

  constructor({ userRepository, token }) {
    this.#userRepository = userRepository
    this.#token = token;
  }

  errorUnauthorized() {
    return erro({
      code: 'UNAUTHORIZED',
      message: 'Error while authenticating',
      erros: ['Email or password invalid']
    })
  }

  async execute({ email, password }) {
    try {
      const userCreatedWithEmail = await this.#userRepository.findOneByEmail(email)
      if (!userCreatedWithEmail.data) return this.errorUnauthorized();
      
      const passwordMatch = hash.compare(password, userCreatedWithEmail.data.password)
      if (!passwordMatch) return this.errorUnauthorized()

      const jwtToken = this.#token.generate(userCreatedWithEmail.data.secureReturn())

      return ok({
        code: 'SUCCESS', data: {
          ...userCreatedWithEmail.data.secureReturn(), token: jwtToken
        }
      });
    } catch (error) {
      console.log(error)

      if (error instanceof validationError) {
        return erro({ code: 'VALIDATION_INPUT', message: error.message, erros: error.erros })
      }

      return erro({ code: 'SERVICE', message: 'There was an error to authenticate', erros: [error.message] })
    }
  }
}