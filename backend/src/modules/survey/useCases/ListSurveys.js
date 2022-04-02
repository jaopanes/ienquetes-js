const { erro, ok } = require('../../../common')

module.exports = class ListSurveys {
  #surveyRepository = null

  constructor({ surveyRepository }) {
    this.#surveyRepository = surveyRepository
  }

  async execute() {
    try {
      const listSurveys = await this.#surveyRepository.find()

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