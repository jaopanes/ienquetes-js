const { uuid, date, ValidationError, validations } = require('../common')

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
   * @param {string} [param.deletedAt] Deleted at date (YYYY-MM-DD HH:mm:ss).
   * @param {string} [param.id] Id (UUID).
   */
  #erros = []

  constructor({
    title,
    initiatedAt,
    endedAt,
    options,
    createdAt = date.currentDateHour(),
    updatedAt = date.currentDateHour(),
    deletedAt = null,
    id = uuid.generate()
  }) {
    if (!title || typeof title !== 'string') {
      this.#erros.push('Title is required and string type')
    }
    if (!initiatedAt || typeof initiatedAt !== 'string' || !validations.dateHour(initiatedAt)) {
      this.#erros.push('Initiated at is required and must be in the format YYYY-MM-DD HH:mm:ss')
    }
    if (!endedAt || typeof endedAt !== 'string' || !validations.dateHour(endedAt)) {
      this.#erros.push('Ended at is required and must be in the format YYYY-MM-DD HH:mm:ss')
    }
    if (!options || !Array.isArray(options) || options.length < 3) {
      this.#erros.push('Options is required and must have at least 3 options')
    }
    if (!createdAt || typeof createdAt !== 'string' || !validations.dateHour(createdAt)) {
      this.#erros.push('Created at is required and must be in the format YYYY-MM-DD HH:mm:ss')
    }
    if (!updatedAt || typeof updatedAt !== 'string' || !validations.dateHour(updatedAt)) {
      this.#erros.push('Updated at is required and must be in the format YYYY-MM-DD HH:mm:ss')
    }
    if (deletedAt && !validations.dateHour(deletedAt)) {
      this.#erros.push('Deleted at is must be in the format YYYY-MM-DD HH:mm:ss')
    }

    if (this.#erros.length > 0) {
      throw new ValidationError('There were validation errors', this.#erros)
    }

    this.title = title
    this.initiatedAt = initiatedAt
    this.endedAt = endedAt
    this.options = options
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
    this.id = id
  }

  safeDelete() {
    this.deletedAt = date.currentDateHour()
    this.updatedAt = date.currentDateHour()

    return this
  }
}