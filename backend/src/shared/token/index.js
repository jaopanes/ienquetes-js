const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET_KEY;

module.exports = {
  verify(token) {
    return jwt.verify(token, secret)
  },
  generate(data, expires = 300) {
    return jwt.sign(data, secret, {
      expiresIn: expires
    })
  }
}