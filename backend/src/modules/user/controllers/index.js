const RegisterUserController = require('./RegisterUserController');
const AuthenticateController = require('./AuthenticateController')

const { registerUser, authenticate } = require('../useCases')

module.exports = {
  registerUserController: new RegisterUserController({ registerUser }),
  authenticateController: new AuthenticateController({ authenticate })
}