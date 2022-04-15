const { ok, erro } = require('../../../util')
const Survey = require('../models/Survey')

module.exports = class DeleteSurvey {
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

      const survey = findSurvey.data.safeDelete()
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

      return erro({ code: 'SERVICE', message: 'Foram encontrados erros ao deletar uma enquete.', erros: [error.message] })
    }
  }
} 