const { uuid, hash } = require('../../../shared/utils')
const { date, validations } = require('../../../shared/helpers')
const { validationError } = require('../../../shared/errors')

module.exports = class User {
  #erros = []

  constructor({
    name,
    nickname,
    email,
    password,
    createdAt = date.currentDateHour(),
    updatedAt = date.currentDateHour(),
    deletedAt = null,
    id = uuid.generate()
  }) {
    if (!name || typeof name !== 'string') {
      this.#erros.push('"name" é obrigatório e do tipo string.')
    }
    if (!nickname || typeof nickname !== 'string') {
      this.#erros.push('"nickname" é obrigatório e do tipo string.')
    }
    if (!email || typeof email !== 'string' || !validations.email(email)) {
      this.#erros.push('"email" é obrigatório e do tipo string.')
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      this.#erros.push('"password" é obrigatório e deve ser no mínimo 6 caractéres.')
    }
    if (!createdAt || typeof createdAt !== 'string' || !validations.dateHour(createdAt)) {
      this.#erros.push('"createdAt" é obrigatório e deve ser uma data no formato YYYY-MM-DD HH:mm:ss.')
    }
    if (!updatedAt || typeof updatedAt !== 'string' || !validations.dateHour(updatedAt)) {
      this.#erros.push('"updatedAt" é obrigatório e deve ser uma data no formato YYYY-MM-DD HH:mm:ss.')
    }
    if (deletedAt && !validations.dateHour(deletedAt)) {
      this.#erros.push('"deletedAt" deve ser uma data no formato YYYY-MM-DD HH:mm:ss')
    }

    if (this.#erros.length > 0) {
      throw new validationError('Foram encontrados erros de validação para usuário.', this.#erros)
    }

    this.name = name
    this.nickname = nickname.toLowerCase()
    this.email = email.toLowerCase()
    this.password = password
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
    this.id = id
  }

  hashPassword() {
    this.password = hash.generateHash(this.password)
    return this
  }

  secureReturn() {
    return {
      name: this.name,
      nickname: this.nickname,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      id: this.id
    }
  }
}