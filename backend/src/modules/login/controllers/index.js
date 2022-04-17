const AuthenticateController = require('./AuthenticateController')
const VerifyTokenController = require('./VerifyTokenController')

const { authenticate, verifyToken } = require('../useCases')

module.exports = {
  authenticateController: new AuthenticateController({ authenticate }),
  verifyTokenController: new VerifyTokenController({ verifyToken })
}