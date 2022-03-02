const services = require('../services')

module.exports = class SurveyController {
  static async create(req, res) {
    try {
      const createSurveyService = services["createSurvey"]();
      const createSurvey = await createSurveyService.execute(req.body)

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
      return res.status(500).json({ message: "There was an error entering the record", code: "CONTROLLER_1" })
    }
  }
}