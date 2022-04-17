const { routes: user } = require('../../../../modules/user')
const { routes: survey } = require('../../../../modules/survey')
const { routes: login } = require('../../../../modules/login')

module.exports = router => {
  router.use('/user', user)
  router.use('/survey', survey)
  router.use('/login', login)

  return router
}