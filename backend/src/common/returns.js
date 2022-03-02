module.exports = {
  /**
   * @param {any} data 
   * @return {object} {ok: boolean, data: any} 
   */
  ok({ data = null }) {
    return { ok: true, data }
  },

  /**
   * @param {string} message 
   * @param {string} code 
   * @param {array} erros 
   * @return {object} {ok: boolean, message: string, code: string, erros: array}
   */
  erro({ message, code, erros = undefined }) {
    return { ok: false, message, erros, code }
  },

  /**
   * @param {number} status 
   * @param {any} data 
   * @return {object} {status: number, data: any}
   */
  httpOk({ status, data }) {
    return { status, data }
  },

  /**
   * @param {number} status 
   * @param {string} code 
   * @param {string} message 
   * @param {array} erros 
   * @return {object} {ok: boolean, message: string, code: string}
   */
  httpErro({ status, code, message, erros = undefined }) {
    return { status, code, message, erros }
  }
}