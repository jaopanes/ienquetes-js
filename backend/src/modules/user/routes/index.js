const router = require('express').Router()

const { registerUserController } = require('../controllers')

router.post('/', (req, res) => registerUserController.execute(req, res))

module.exports = router