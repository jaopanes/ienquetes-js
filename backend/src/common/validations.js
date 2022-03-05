const moment = require('moment')

module.exports = {
  dateHour(date) {
    return moment(date, "YYYY-MM-DD HH:mm:ss", true).isValid()
  }
}