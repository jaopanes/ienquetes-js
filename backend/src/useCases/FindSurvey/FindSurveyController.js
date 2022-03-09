module.exports = class FindSurveyController {
  #findSurveyService = null

  constructor({ findSurveyService }) {
    this.#findSurveyService = findSurveyService
  }

  async execute(req, res) {
    try {
      const { id } = req.params

      const findSurvey = await this.#findSurveyService.execute({ id })

      if (findSurvey.status !== 200) {
        return res.status(findSurvey.status).json({
          message: findSurvey.message,
          code: findSurvey.code,
          erros: findSurvey.erros
        })
      }

      return res.status(findSurvey.status).json(findSurvey.data)
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'There was an error occurred finding record', code: 'CONTROLLER_1', erros: [error.message] })
    }
  }
}