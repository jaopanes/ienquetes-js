const uuid = require('uuid')

module.exports = {
  generate() {
    return uuid.v4()
  }
}