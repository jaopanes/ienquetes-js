const { uuid, date } = require('../common')

/**
 * @description Survey model
 * @class Survey
 */
module.exports = class Survey {
  /**
   * @param {object} param 
   * @param {string} param.title Title survey.
   * @param {string} param.initiatedAt Date to init survey.
   * @param {string} param.endedAt Date to end survey.
   * @param {array} param.options Options survey.
   * @param {string} [param.createdAt] Created at date (YYYY-MM-DD HH:mm:ss).
   * @param {string} [param.updatedAt] Updated at date (YYYY-MM-DD HH:mm:ss).
   * @param {string} [param.id] Id (UUID).
   */
  constructor({
    title,
    initiatedAt,
    endedAt,
    options,
    createdAt = date.currentDateHour(),
    updatedAt = date.currentDateHour(),
    id = uuid.generate()
  }) {
    this.title = title
    this.initiatedAt = initiatedAt
    this.endedAt = endedAt
    this.options = options
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.id = id
  }
}