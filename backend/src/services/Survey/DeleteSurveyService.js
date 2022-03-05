const { httpErro, httpOk } = require('../../common')
const Survey = require('../../models/Survey')

module.exports = class DeleteSurveyService {
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

      const survey = new Survey({
        title: findSurvey.data.title,
        initiatedAt: findSurvey.data.initiatedAt,
        endedAt: findSurvey.data.endedAt,
        options: findSurvey.data.options,
        createdAt: findSurvey.data.createdAt,
        updatedAt: findSurvey.data.updatedAt,
        deletedAt: findSurvey.data.deletedAt,
        id: findSurvey.data.id
      }).safeDelete()

      const safeDeleteSurvey = await this.#surveyRepository.safeDelete(survey)

      if (!safeDeleteSurvey.ok) {
        return httpErro({
          status: 500,
          code: findSurvey.code,
          message: findSurvey.message,
          erros: findSurvey.erros
        })
      }

      return httpOk({ status: 204 })
    } catch (error) {
      console.log(error)

      return httpErro({ status: 500, code: 'SERVICE_1', message: 'There was an error occurred deleting record', erros: [error.message] })
    }
  }
} 