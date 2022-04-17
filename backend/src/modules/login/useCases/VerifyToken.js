const { erro, ok } = require('../../../shared/helpers').returns
const { token: serviceToken } = require('../../../shared/utils')

module.exports = class VerifyToken {
  constructor() { }

  async execute({ token }) {
    try {
      const verifyToken = serviceToken.verify(token)

      if (!verifyToken) {
        return erro({
          code: 'UNAUTHORIZED',
          message: 'Erro ao validar token',
          erros: ['Token inválido']
        })
      }

      return ok({ code: 'NO_CONTENT' });
    } catch (error) {
      console.log(error)

      return erro({ code: 'SERVICE', message: 'Foram encontrados erros ao validar token.', erros: [error.message] })
    }
  }
}