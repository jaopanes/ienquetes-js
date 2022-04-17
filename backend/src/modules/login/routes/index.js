const router = require('express').Router()

const { authenticateController, verifyTokenController } = require('../controllers')

router.post('/', (req, res) => authenticateController.execute(req, res))
router.post('/verify', (req, res) => verifyTokenController.execute(req, res))

module.exports = router