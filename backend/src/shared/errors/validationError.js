module.exports = class ValidationError extends Error {
  constructor(message, erros) {
    super(message)
    this.name = 'ValidationError'
    this.erros = erros
  }
}