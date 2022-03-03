const Survey = require("../models/Survey")
const { httpErro, httpOk, ValidationError } = require('../common')

module.exports = class ListSurveysService {
  #surveyRepository = null

  constructor({ surveyRepository }) {
    this.#surveyRepository = surveyRepository
  }

  async execute() {
    try {
      const listSurveys = await this.#surveyRepository.find()

      if (!listSurveys.ok) {
        return httpErro({
          status: 500,
          code: surveyCreate.code,
          message: surveyCreate.message,
          erros: surveyCreate.erros
        })
      }

      return httpOk({ status: 200, data: listSurveys.data })
    } catch (error) {
      console.log(error)

      return httpErro({ status: 500, code: "SERVICE_1", message: "There was an error occurred while listinig records", erros: [error.message] })
    }
  }
} 