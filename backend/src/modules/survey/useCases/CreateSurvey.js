const Survey = require('../models/Survey')
const { erro, ok } = require('../../../shared/helpers').returns
const { validationError } = require('../../../shared/errors')

module.exports = class CreateSurvey {
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
  async execute({ title, initiatedAt, endedAt, options, user }) {
    try {
      const survey = new Survey({
        title,
        initiatedAt,
        endedAt,
        options,
        user
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

      if (error instanceof validationError) {
        return erro({ code: 'VALIDATION_INPUT', message: error.message, erros: error.erros })
      }

      return erro({ code: 'SERVICE', message: 'Foram encontrados erros ao criar uma enquete.', erros: [error.message] })
    }
  }
} 