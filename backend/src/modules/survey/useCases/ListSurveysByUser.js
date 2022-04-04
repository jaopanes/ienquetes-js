const { erro, ok } = require('../../../util')

module.exports = class ListSurveysByUser {
  #surveyRepository = null

  constructor({ surveyRepository }) {
    this.#surveyRepository = surveyRepository
  }

  async execute({ userId }) {
    try {
      const listSurveys = await this.#surveyRepository.findByUser(userId)

      if (!listSurveys.ok) {
        return erro({
          code: listSurveys.code,
          message: listSurveys.message,
          erros: listSurveys.erros
        })
      }

      return ok({ data: listSurveys.data })
    } catch (error) {
      console.log(error)

      return erro({ code: 'SERVICE', message: 'There was an error occurred while listinig records', erros: [error.message] })
    }
  }
} 