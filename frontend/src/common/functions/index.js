import date from './date'

export default {
  install(app) {
    app.config.globalProperties.$date = date;
    app.provide("date", { date });
  }
}