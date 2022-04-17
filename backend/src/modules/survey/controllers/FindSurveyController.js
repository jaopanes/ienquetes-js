const { statusCodes } = require('../../../shared/helpers')

module.exports = class FindSurveyController {
  #findSurvey = null

  constructor({ findSurvey }) {
    this.#findSurvey = findSurvey
  }

  async execute(req, res) {
    try {
      const { id } = req.params

      const findSurvey = await this.#findSurvey.execute({ id })
      const statusCode = statusCodes[findSurvey.code]

      if (!findSurvey.ok) {
        return res.status(statusCode).json({
          message: findSurvey.message,
          code: findSurvey.code,
          erros: findSurvey.erros
        })
      }

      return res.status(statusCode).json(findSurvey.data)
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'Foram encontrados erros ao buscar uma enquete.', code: 'CONTROLLER', erros: [error.message] })
    }
  }
}