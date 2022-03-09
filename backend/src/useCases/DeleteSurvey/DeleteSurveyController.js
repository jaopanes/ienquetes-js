module.exports = class DeleteSurveyController {
  #deleteSurveyService = null

  constructor({ deleteSurveyService }) {
    this.#deleteSurveyService = deleteSurveyService
  }

  async execute(req, res) {
    try {
      const { id } = req.params

      const deleteSurvey = await this.#deleteSurveyService.execute({ id })

      if (deleteSurvey.status !== 204) {
        return res.status(deleteSurvey.status).json({
          message: deleteSurvey.message,
          code: deleteSurvey.code,
          erros: deleteSurvey.erros
        })
      }

      return res.status(deleteSurvey.status).json()
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'There was an error occurred deleting record', code: 'CONTROLLER_1', erros: [error.message] })
    }
  }
}