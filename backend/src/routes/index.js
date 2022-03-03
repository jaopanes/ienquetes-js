const SurveyController = require('../controllers/SurveyController')

module.exports = router => {
  router.post('/survey', SurveyController.create)
  router.get('/survey', SurveyController.list)
  router.get('/survey/:id', SurveyController.find)
  router.delete('/survey/:id', SurveyController.delete)

  return router
}