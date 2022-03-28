const RegisterUserService = require('./RegisterUserService')

const { userRepository } = require('../../../infra/db/repositories')

module.exports = {
  registerUserService: new RegisterUserService({ userRepository })
}