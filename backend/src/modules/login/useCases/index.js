const Authenticate = require('./Authenticate')

const { userRepository } = require('../../user').repositories
const token = require('../../../shared/token')

module.exports = {
  authenticate: new Authenticate({ userRepository, token })
}