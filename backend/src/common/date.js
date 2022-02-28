const { tz } = require('moment-timezone')

module.exports = {
  /**
   * @return {string} Date on YYYY-MM-DD format.
   */
  currentDate() {
    return tz('America/Sao_Paulo').format('YYYY-MM-DD')
  },
  /**
   * @return {string} Date and hour on YYYY-MM-DD HH:mm:ss format.
   */
  currentDateHour() {
    return tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
  }
}