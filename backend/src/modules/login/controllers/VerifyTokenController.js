const { statusCodes } = require('../../../shared/helpers')

module.exports = class verifyTokenController {
  #verifyToken = null

  constructor({ verifyToken }) {
    this.#verifyToken = verifyToken
  }

  async execute(req, res) {
    try {
      const { token } = req.body

      const verifyToken = await this.#verifyToken.execute({ token })
      const statusCode = statusCodes[verifyToken.code]

      if (!verifyToken.ok) {
        return res.status(statusCode).json({
          message: verifyToken.message,
          code: verifyToken.code,
          erros: verifyToken.erros
        })
      }

      return res.status(statusCode).json(verifyToken.data)
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'Foram encontrados erros ao validar token.', code: 'CONTROLLER', erros: [error.message] })
    }
  }
}