const Authenticate = require('./Authenticate')

const { userRepository } = require('../../user').repositories

module.exports = {
  authenticate: new Authenticate({ userRepository })
}