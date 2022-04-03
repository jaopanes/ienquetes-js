const RegisterUser = require('./RegisterUser')
const Authenticate = require('./Authenticate')

const { userRepository } = require('../repositories')
const token = require('../../../shared/token')

module.exports = {
  registerUser: new RegisterUser({ userRepository }),
  authenticate: new Authenticate({ userRepository, token })
}