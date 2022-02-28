const uuid = require('uuid')

module.exports = {
  /**
   * @return {string} UUID V4
   */
  generate() {
    return uuid.v4();
  }
}