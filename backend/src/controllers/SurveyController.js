const services = require('../services')

module.exports = class SurveyController {
  static async create(req, res) {
    try {
      const createSurveyService = services['createSurvey']()
      const createSurvey = await createSurveyService.execute(req.body)

      if (createSurvey.status !== 201) {
        return res.status(createSurvey.status).json({
          message: createSurvey.message,
          code: createSurvey.code,
          erros: createSurvey.erros
        })
      }

      return res.status(createSurvey.status).json(createSurvey.data)
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'There was an error entering the record', code: 'CONTROLLER_1', erros: [error.message] })
    }
  }

  static async list(req, res) {
    try {
      const listSurveysService = services['listSurveys']()
      const listSurveys = await listSurveysService.execute()

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

  static async find(req, res) {
    try {
      const { id } = req.params

      const findSurveyService = services['findSurvey']()
      const findSurvey = await findSurveyService.execute({ id })

      if (findSurvey.status !== 200) {
        return res.status(findSurvey.status).json({
          message: findSurvey.message,
          code: findSurvey.code,
          erros: findSurvey.erros
        })
      }

      return res.status(findSurvey.status).json(findSurvey.data)
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'There was an error occurred finding record', code: 'CONTROLLER_1', erros: [error.message] })
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params

      const deleteSurveyService = services['deleteSurvey']()
      const deleteSurvey = await deleteSurveyService.execute({ id })

      if (deleteSurvey.status !== 204) {
        return res.status(deleteSurvey.status).json({
          message: deleteSurvey.message,
          code: deleteSurvey.code,
          erros: deleteSurvey.erros
        })
      }

      return res.status(deleteSurvey.status).json()
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'There was an error occurred deleting record', code: 'CONTROLLER_1', erros: [error.message] })
    }
  }
}