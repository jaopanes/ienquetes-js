module.exports = {
  ok(data = null) {
    return { ok: true, data }
  },
  erro(message, cod) {
    return { ok: false, message, cod }
  }
}