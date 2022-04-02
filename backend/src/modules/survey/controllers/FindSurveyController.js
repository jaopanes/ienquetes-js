const { statusCodes } = require("../../../common")

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

      return res.status(500).json({ message: 'There was an error occurred finding record', code: 'CONTROLLER', erros: [error.message] })
    }
  }
}