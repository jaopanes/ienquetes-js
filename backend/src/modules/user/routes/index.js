const router = require('express').Router()

const { registerUserController, authenticateController } = require('../controllers')

router.post('/', (req, res) => registerUserController.execute(req, res))
router.post('/authenticate', (req, res) => authenticateController.execute(req, res))

module.exports = router