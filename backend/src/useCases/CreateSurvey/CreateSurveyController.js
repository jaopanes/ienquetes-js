const { statusCodes } = require("../../common")

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
      const statusCode = statusCodes[createSurvey.code]

      if (!createSurvey.ok) {
        return res.status(statusCode).json({
          message: createSurvey.message,
          code: createSurvey.code,
          erros: createSurvey.erros
        })
      }

      return res.status(statusCode).json(createSurvey.data)
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'There was an error entering the record', code: 'CONTROLLER', erros: [error.message] })
    }
  }
}