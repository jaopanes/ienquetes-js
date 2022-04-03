const bcrypt = require('bcryptjs')

module.exports = {
  generateHash(value) {
    return bcrypt.hashSync(value, 8)
  },
  compare(value, hash) {
    return bcrypt.compareSync(value, hash)
  }
} 