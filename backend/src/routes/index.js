const SurveyController = require('../controllers/SurveyController')

module.exports = router => {
  router.post('/survey', SurveyController.create)

  return router
}