const { httpErro, httpOk } = require('../../common')

module.exports = class FindSurveyService {
  #surveyRepository = null

  constructor({ surveyRepository }) {
    this.#surveyRepository = surveyRepository
  }

  /**
   * @param {string} id
   */
  async execute({ id }) {
    try {
      const findSurvey = await this.#surveyRepository.findOne(id)

      if (!findSurvey.ok) {
        return httpErro({
          status: 500,
          code: findSurvey.code,
          message: findSurvey.message,
          erros: findSurvey.erros
        })
      } else if (!findSurvey.data) {
        return httpErro({
          status: 404,
          code: 'NOT_FOUND',
          message: 'Record not found with the given id'
        })
      }

      return httpOk({ status: 200, data: findSurvey.data })
    } catch (error) {
      console.log(error)

      return httpErro({ status: 500, code: 'SERVICE_1', message: 'There was an error occurred finding record', erros: [error.message] })
    }
  }
} 