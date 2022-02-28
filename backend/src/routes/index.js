const createSurveyController = require('../controllers/createSurveyController')

module.exports = router => {
  router.post('/survey', createSurveyController)

  return router
}