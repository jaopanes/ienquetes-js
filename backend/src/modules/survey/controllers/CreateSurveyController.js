const { statusCodes } = require('../../../shared/helpers')

module.exports = class CreateSurveyController {
  #createSurvey = null

  constructor({ createSurvey }) {
    this.#createSurvey = createSurvey
  }

  async execute(req, res) {
    try {
      const { title, initiatedAt, endedAt, options } = req.body
      const { userAuthorized: user } = req;

      const createSurvey = await this.#createSurvey.execute({
        title, initiatedAt, endedAt, options, user
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

      return res.status(500).json({ message: 'Foram encontrados erros ao criar uma enquete.', code: 'CONTROLLER', erros: [error.message] })
    }
  }
}