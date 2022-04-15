const { erro, ok } = require('../../../util')

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

      return erro({ code: 'SERVICE', message: 'Foram encontrados erros ao listar enquetes.', erros: [error.message] })
    }
  }
} 