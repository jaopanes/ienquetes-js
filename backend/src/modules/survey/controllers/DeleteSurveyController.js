const { statusCodes } = require("../../../common")
module.exports = class DeleteSurveyController {
  #deleteSurveyService = null

  constructor({ deleteSurveyService }) {
    this.#deleteSurveyService = deleteSurveyService
  }

  async execute(req, res) {
    try {
      const { id } = req.params

      const deleteSurvey = await this.#deleteSurveyService.execute({ id })
      const statusCode = statusCodes[deleteSurvey.code]

      if (!deleteSurvey.ok) {
        return res.status(statusCode).json({
          message: deleteSurvey.message,
          code: deleteSurvey.code,
          erros: deleteSurvey.erros
        })
      }

      return res.status(statusCode).json()
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'There was an error occurred deleting record', code: 'CONTROLLER', erros: [error.message] })
    }
  }
}