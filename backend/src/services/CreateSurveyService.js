const Survey = require("../models/Survey")

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
    const survey = new Survey({
      title: param.title,
      initiatedAt: param.initiatedAt,
      endedAt: param.endedAt,
      options: param.options
    });

    //const surveyCreate = await this.#surveyRepository.insert(survey);

    return survey;
  }
}