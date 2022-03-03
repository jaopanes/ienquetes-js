const SurveyController = require('../controllers/SurveyController')

module.exports = router => {
  router.post('/survey', SurveyController.create)
  router.get('/survey', SurveyController.list)

  return router
}