const RegisterUser = require('./RegisterUser')

const { userRepository } = require('../repositories')

module.exports = {
  registerUser: new RegisterUser({ userRepository }),
}