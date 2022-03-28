const { statusCodes } = require('../../../common')

module.exports = class RegisterUserController {
  #registerUserService = null

  constructor({ registerUserService }) {
    this.#registerUserService = registerUserService
  }

  async execute(req, res) {
    try {
      const { name, nickname, email, password, confirmPassword } = req.body

      const registerUser = await this.#registerUserService.execute({
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

      return res.status(500).json({ message: 'There was an error register user', code: 'CONTROLLER', erros: [error.message] })
    }
  }
}