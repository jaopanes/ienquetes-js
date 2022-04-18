const { uuid } = require('../../../shared/utils')
const { date, validations } = require('../../../shared/helpers')
const { validationError } = require('../../../shared/errors')

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
   * @param {object} param.user User created survey.
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
    user,
    createdAt = date.currentDateHour(),
    updatedAt = date.currentDateHour(),
    deletedAt = null,
    id = uuid.generate()
  }) {
    if (!title || typeof title !== 'string') {
      this.#erros.push('"title" é obrigatório e deve ser do tipo texto.')
    }
    if (!initiatedAt || typeof initiatedAt !== 'string' || !validations.dateHour(initiatedAt)) {
      this.#erros.push('"initiatedAt" é obrigatório e deve ser uma data válida no formato YYYY-MM-DD HH:mm:ss.')
    }
    if (!endedAt || typeof endedAt !== 'string' || !validations.dateHour(endedAt)) {
      this.#erros.push('"endedAt" é obrigatório e deve ser uma data válida no formato YYYY-MM-DD HH:mm:ss.')
    }
    if (!validations.dateIsBefore(initiatedAt, endedAt)) {
      this.#erros.push('"iniaitedAt" deve ser menor que "endedAt".')
    }
    if (!validations.dateIsBefore(date.currentDateHour(), initiatedAt)) {
      this.#erros.push('"iniaitedAt" deve ser maior que a data atual.')
    }
    if (!options || !Array.isArray(options) || options.length < 3) {
      this.#erros.push('"options" é obrigatório e deve ter no mínimo 3 opções.')
    }
    if (!createdAt || typeof createdAt !== 'string' || !validations.dateHour(createdAt)) {
      this.#erros.push('"createdAt" é obrigatório e deve uma data no formato YYYY-MM-DD HH:mm:ss.')
    }
    if (!updatedAt || typeof updatedAt !== 'string' || !validations.dateHour(updatedAt)) {
      this.#erros.push('"updatedAt" é obrigatório e deve ser uma data no formato YYYY-MM-DD HH:mm:ss.')
    }
    if (deletedAt && !validations.dateHour(deletedAt)) {
      this.#erros.push('"deletedAt" deve ser uma data no formato YYYY-MM-DD HH:mm:ss.')
    }
    if (!user || typeof user !== 'object') {
      this.#erros.push('"user" é obrigatório e deve ser um objeto.')
    } else {
      if (!user.id) {
        this.#erros.push('Campo "id" é obrigatório para user.')
      }
      if (!user.name) {
        this.#erros.push('Campo "name" é obrigatório para user.')
      }
      if (!user.nickname) {
        this.#erros.push('Campo "nickname" é obrigatório para user.')
      }
      if (!user.email) {
        this.#erros.push('Campo "email" é obrigatório para user.')
      }
    }

    if (this.#erros.length > 0) {
      throw new validationError('Foram encontrados erros de validação para enquete.', this.#erros)
    }

    this.title = title
    this.initiatedAt = initiatedAt
    this.endedAt = endedAt
    this.options = options.map(option => {
      if (typeof option === 'string') {
        return {
          id: uuid.generate(),
          name: option
        }
      }

      return option
    })
    this.user = user
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

  secureReturn() {
    return {
      title: this.title,
      initiatedAt: this.initiatedAt,
      endedAt: this.endedAt,
      options: this.options,
      user: this.user,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      id: this.id
    }
  }
}