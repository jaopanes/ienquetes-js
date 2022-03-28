module.exports = {
  ok({ data = null, code = "SUCCESS" }) {
    return { ok: true, data, code }
  },
  erro({ message, code, erros = undefined }) {
    return { ok: false, message, erros, code }
  },
}