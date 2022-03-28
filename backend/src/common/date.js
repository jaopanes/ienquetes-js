const { tz } = require('moment-timezone')

module.exports = {
  currentDate() {
    return tz('America/Sao_Paulo').format('YYYY-MM-DD')
  },
  currentDateHour() {
    return tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
  }
}