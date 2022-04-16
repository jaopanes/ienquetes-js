import { tz } from 'moment-timezone'
import moment from 'moment'

const timezone = () => tz('America/Sao_Paulo')

export default {
  currentDateHour() {
    return timezone().format('YYYY-MM-DD HH:mm:ss')
  },
  difference2Dates(first, second) {
    const firtDate = moment(first)
    const secondDate = moment(second)

    return firtDate.diff(secondDate, 'days')
  }
}