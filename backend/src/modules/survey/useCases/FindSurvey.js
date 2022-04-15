const { erro, ok } = require('../../../util')

module.exports = class FindSurvey {
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

      return ok({ data: findSurvey.data })
    } catch (error) {
      console.log(error)

      return erro({ code: 'SERVICE', message: 'Foram encontrados erros ao buscar uma enquete.', erros: [error.message] })
    }
  }
} 