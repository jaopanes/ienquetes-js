const { date, uuid, validations, validationError, hash } = require('../../../common')

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
      this.#erros.push('Name is required and string type')
    }
    if (!nickname || typeof nickname !== 'string') {
      this.#erros.push('Nickname is required and string type')
    }
    if (!email || typeof email !== 'string' || !validations.email(email)) {
      this.#erros.push('Email is required and must be a valid email')
    }
    if (!password || typeof password !== 'string') {
      this.#erros.push('Password is required and must be a valid password')
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
      throw new validationError('There were validation errors', this.#erros)
    }

    this.name = name
    this.nickname = nickname.toLowerCase()
    this.email = email.toLowerCase()
    this.password = hash.generateHash(password)
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
    this.id = id
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