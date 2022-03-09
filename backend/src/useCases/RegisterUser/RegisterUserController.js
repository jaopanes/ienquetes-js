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

      if (registerUser.status !== 201) {
        return res.status(registerUser.status).json({
          message: registerUser.message,
          code: registerUser.code,
          erros: registerUser.erros
        })
      }

      return res.status(registerUser.status).json(registerUser.data)
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'There was an error register user', code: 'CONTROLLER_1', erros: [error.message] })
    }
  }
}