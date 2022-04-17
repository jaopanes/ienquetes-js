const router = require('express').Router()

const { authenticateController } = require('../controllers')

router.post('/', (req, res) => authenticateController.execute(req, res))

module.exports = router