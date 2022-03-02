module.exports = {
  ok(data = null) {
    return { ok: true, data }
  },
  erro(message, code) {
    return { ok: false, message, code }
  },
  httpOk(status, data) {
    return { status, data }
  },
  httpErro(status, code, message) {
    return { status, code, message }
  }
}