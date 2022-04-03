const { routes: user } = require("../../../modules/user")
const { routes: survey } = require("../../../modules/survey")

module.exports = router => {
  router.use('/user', user)
  router.use('/survey', survey)

  return router
}