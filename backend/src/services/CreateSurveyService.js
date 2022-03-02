const Survey = require("../models/Survey")
const { httpErro, httpOk, ValidationError } = require('../common')

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
    const erros = []

    try {
      if (!title) {
        erros.push('Name field is required')
      }
      if (!initiatedAt) {
        erros.push('Initiated at field is required')
      }
      if (!endedAt) {
        erros.push('Ended at field is required')
      }
      if (!options) {
        erros.push('Options field is required')
      }

      if (erros.length > 0) {
        throw new ValidationError("There were validation errors", erros)
      }

      const survey = new Survey({
        title,
        initiatedAt,
        endedAt,
        options
      });

      const surveyCreate = await this.#surveyRepository.insert(survey)

      if (!surveyCreate.ok) {
        return httpErro({
          status: 500,
          code: surveyCreate.code,
          message: surveyCreate.message,
          erros: surveyCreate.erros
        })
      }

      return httpOk({ status: 201, data: survey })
    } catch (error) {
      console.log(error)

      if (error instanceof ValidationError) {
        return httpErro({ status: 400, code: "VALIDATION_INPUT", message: error.message, erros: error.erros })
      }

      return httpErro({ status: 500, code: "SERVICE_1", message: "There was an error entering the record", erros: [error.message] })
    }
  }
} 