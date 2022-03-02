const Survey = require("../models/Survey")
const { returns: { httpErro, httpOk } } = require('../common')

module.exports = class CreateSurveyService {
  #surveyRepository = null

  constructor({ surveyRepository }) {
    this.#surveyRepository = surveyRepository
  }

  /**
   * @param {object} param
   * @param {string} param.title
   * @param {string} param.initiatedAt
   * @param {string} param.endedAt
   * @param {array} param.options
   */
  async execute(param) {
    try {
      const survey = new Survey({
        title: param.title,
        initiatedAt: param.initiatedAt,
        endedAt: param.endedAt,
        options: param.options
      });

      const surveyCreate = await this.#surveyRepository.insert(survey)

      if (!surveyCreate.ok) {
        return httpErro(400, surveyCreate.code, surveyCreate.message)
      }

      return httpOk(201, survey)
    } catch (error) {
      console.log(error)
      return httpErro(500, "SERVICE_1", "There was an error entering the record")
    }
  }
}