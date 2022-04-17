const Authenticate = require('./Authenticate')
const VerifyToken = require('./VerifyToken')

const { userRepository } = require('../../user').repositories

module.exports = {
  authenticate: new Authenticate({ userRepository }),
  verifyToken: new VerifyToken()
}