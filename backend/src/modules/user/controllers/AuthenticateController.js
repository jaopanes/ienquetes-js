const { statusCodes } = require('../../../util')

module.exports = class AuthenticateController {
  #authenticate = null

  constructor({ authenticate }) {
    this.#authenticate = authenticate
  }

  async execute(req, res) {
    try {
      const { email, password } = req.body

      const authenticate = await this.#authenticate.execute({
        email, password
      })
      const statusCode = statusCodes[authenticate.code]

      if (!authenticate.ok) {
        return res.status(statusCode).json({
          message: authenticate.message,
          code: authenticate.code,
          erros: authenticate.erros
        })
      }

      return res.status(statusCode).json(authenticate.data)
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'There was an error authenticate', code: 'CONTROLLER', erros: [error.message] })
    }
  }
}