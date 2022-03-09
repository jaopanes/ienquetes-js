const Survey = require('../../models/Survey')
const { ok, erro, ValidationError } = require('../../common')

module.exports = class CreateSurveyService {
  #surveyRepository = null

  constructor({ surveyRepository }) {
    this.#surveyRepository = surveyRepository
  }

  /**
   * @param {string} title
   * @param {string} initiatedAt
   * @param {string} endedAt
   * @param {array} options
   */
  async execute({ title, initiatedAt, endedAt, options }) {
    try {
      const survey = new Survey({
        title,
        initiatedAt,
        endedAt,
        options
      })

      const surveyCreate = await this.#surveyRepository.insert(survey)

      if (!surveyCreate.ok) {
        return erro({
          code: surveyCreate.code,
          message: surveyCreate.message,
          erros: surveyCreate.erros
        })
      }

      return ok({ data: survey.secureReturn(), code: "CREATED" })
    } catch (error) {
      console.log(error)

      if (error instanceof ValidationError) {
        return erro({ code: 'VALIDATION_INPUT', message: error.message, erros: error.erros })
      }

      return erro({ code: 'SERVICE', message: 'There was an error entering the record', erros: [error.message] })
    }
  }
} 