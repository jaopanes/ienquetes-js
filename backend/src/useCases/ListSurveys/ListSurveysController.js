module.exports = class ListSurveysController {
  #listSurveysService = null

  constructor({ listSurveysService }) {
    this.#listSurveysService = listSurveysService
  }

  async execute(req, res) {
    try {
      const listSurveys = await this.#listSurveysService.execute()

      if (listSurveys.status !== 200) {
        return res.status(listSurveys.status).json({
          message: listSurveys.message,
          code: listSurveys.code,
          erros: listSurveys.erros
        })
      }

      return res.status(listSurveys.status).json(listSurveys.data)
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'There was an error occurred while listinig records', code: 'CONTROLLER_1', erros: [error.message] })
    }
  }
}