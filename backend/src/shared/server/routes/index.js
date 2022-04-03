const user = require("../../../modules/user/routes")
const survey = require("../../../modules/survey/routes")

module.exports = router => {
  router.use('/user', user)
  router.use('/survey', survey)

  return router
}