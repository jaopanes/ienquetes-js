const { statusCodes } = require("../../../util")

module.exports = class ListSurveysController {
  #listSurveys = null

  constructor({ listSurveys }) {
    this.#listSurveys = listSurveys
  }

  async execute(req, res) {
    try {
      const listSurveys = await this.#listSurveys.execute()
      const statusCode = statusCodes[listSurveys.code]

      if (!listSurveys.ok) {
        return res.status(statusCode).json({
          message: listSurveys.message,
          code: listSurveys.code,
          erros: listSurveys.erros
        })
      }

      return res.status(statusCode).json(listSurveys.data)
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'Foram encontrados erros ao listar enquetes.', code: 'CONTROLLER', erros: [error.message] })
    }
  }
}