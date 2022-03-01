const services = require('../services')

module.exports = class SurveyController {
  static async create(req, res) {
    const createSurveyService = services["createSurvey"]();

    const createSurvey = await createSurveyService.execute(req.body)

    res.status(201).json(createSurvey);
  }
}