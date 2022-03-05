const SurveyController = require('../controllers/SurveyController')
const UserController = require('../controllers/UserController')

module.exports = router => {
  router.post('/survey', SurveyController.create)
  router.get('/survey', SurveyController.list)
  router.get('/survey/:id', SurveyController.find)
  router.delete('/survey/:id', SurveyController.delete)

  router.post('/user', UserController.register)

  return router
}