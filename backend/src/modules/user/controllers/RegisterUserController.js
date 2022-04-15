const { statusCodes } = require('../../../util')

module.exports = class RegisterUserController {
  #registerUser = null

  constructor({ registerUser }) {
    this.#registerUser = registerUser
  }

  async execute(req, res) {
    try {
      const { name, nickname, email, password, confirmPassword } = req.body

      const registerUser = await this.#registerUser.execute({
        name, nickname, email, password, confirmPassword
      })
      const statusCode = statusCodes[registerUser.code]

      if (!registerUser.ok) {
        return res.status(statusCode).json({
          message: registerUser.message,
          code: registerUser.code,
          erros: registerUser.erros
        })
      }

      return res.status(statusCode).json(registerUser.data)
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'Foram encontrados erros ao fazer registro.', code: 'CONTROLLER', erros: [error.message] })
    }
  }
}