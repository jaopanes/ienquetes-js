const { userRepository } = require('../../db/repositories')

const RegisterUserService = require('./RegisterUserService')
const RegisterUserController = require('./RegisterUserController')

const registerUserService = new RegisterUserService({ userRepository })
const registerUserController = new RegisterUserController({ registerUserService })

module.exports = {
  registerUserService,
  registerUserController,
}