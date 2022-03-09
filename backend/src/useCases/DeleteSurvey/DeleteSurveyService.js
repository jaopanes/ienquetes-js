const { ok, erro } = require('../../common')
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
        return erro({

          code: findSurvey.code,
          message: findSurvey.message,
          erros: findSurvey.erros
        })
      } else if (!findSurvey.data) {
        return erro({
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
        return erro({
          code: findSurvey.code,
          message: findSurvey.message,
          erros: findSurvey.erros
        })
      }

      return ok({ code: "NO_CONTENT" })
    } catch (error) {
      console.log(error)

      return erro({ code: 'SERVICE', message: 'There was an error occurred deleting record', erros: [error.message] })
    }
  }
} 