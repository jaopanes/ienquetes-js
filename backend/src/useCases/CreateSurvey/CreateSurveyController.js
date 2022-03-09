module.exports = class CreateSurveyController {
  #createSurveyService = null

  constructor({ createSurveyService }) {
    this.#createSurveyService = createSurveyService
  }

  async execute(req, res) {
    try {
      const { title, initiatedAt, endedAt, options } = req.body

      const createSurvey = await this.#createSurveyService.execute({
        title, initiatedAt, endedAt, options
      })

      if (createSurvey.status !== 201) {
        return res.status(createSurvey.status).json({
          message: createSurvey.message,
          code: createSurvey.code,
          erros: createSurvey.erros
        })
      }

      return res.status(createSurvey.status).json(createSurvey.data)
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'There was an error entering the record', code: 'CONTROLLER_1', erros: [error.message] })
    }
  }
}