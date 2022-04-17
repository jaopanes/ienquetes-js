const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET_KEY

module.exports = {
  verify(token) {
    try {
      return jwt.verify(token, secret)
    } catch (error) {
      return false;
    }
  },
  generate(data, expires = 300) {
    return jwt.sign(data, secret, {
      expiresIn: expires
    })
  }
}