const moment = require('moment')

module.exports = {
  dateHour(date) {
    return moment(date, "YYYY-MM-DD HH:mm:ss", true).isValid()
  },
  email(email) {
    const regex = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    return regex.test(email)
  }
}