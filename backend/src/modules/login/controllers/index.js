const AuthenticateController = require('./AuthenticateController')

const { authenticate } = require('../useCases')

module.exports = {
  authenticateController: new AuthenticateController({ authenticate })
}