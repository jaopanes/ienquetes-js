const RegisterUserController = require('./RegisterUserController');

const { registerUserService } = require('../services')

module.exports = {
  registerUserController: new RegisterUserController({ registerUserService })
}