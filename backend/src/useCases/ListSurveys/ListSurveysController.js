const { statusCodes } = require("../../common")

module.exports = class ListSurveysController {
  #listSurveysService = null

  constructor({ listSurveysService }) {
    this.#listSurveysService = listSurveysService
  }

  async execute(req, res) {
    try {
      const listSurveys = await this.#listSurveysService.execute()
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

      return res.status(500).json({ message: 'There was an error occurred while listinig records', code: 'CONTROLLER', erros: [error.message] })
    }
  }
}