const { statusCodes } = require("../../../util")

module.exports = class DeleteSurveyController {
  #deleteSurvey = null

  constructor({ deleteSurvey }) {
    this.#deleteSurvey = deleteSurvey
  }

  async execute(req, res) {
    try {
      const { id } = req.params

      const deleteSurvey = await this.#deleteSurvey.execute({ id })
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