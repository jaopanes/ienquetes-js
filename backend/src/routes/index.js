const { createSurveyController } = require('../useCases/CreateSurvey')
const { deleteSurveyController } = require('../useCases/DeleteSurvey')
const { findSurveyController } = require('../useCases/FindSurvey')
const { listSurveysController } = require('../useCases/ListSurveys')

const { registerUserController } = require('../useCases/RegisterUser')

module.exports = router => {
  router.post('/survey', (req, res) => createSurveyController.execute(req, res))
  router.get('/survey', (req, res) => listSurveysController.execute(req, res))
  router.get('/survey/:id', (req, res) => findSurveyController.execute(req, res))
  router.delete('/survey/:id', (req, res) => deleteSurveyController.execute(req, res))

  router.post('/user', (req, res) => registerUserController.execute(req, res))

  return router
}