const RegisterUserController = require('./RegisterUserController');

const { registerUser } = require('../useCases')

module.exports = {
  registerUserController: new RegisterUserController({ registerUser })
}