const router = require('express').Router()
const { auth } = require('./middlewares')

const { createSurveyController, deleteSurveyController, findSurveyController, listSurveysController } = require('../controllers')

router.post('/', auth, (req, res) => createSurveyController.execute(req, res))
router.delete('/:id', auth, (req, res) => deleteSurveyController.execute(req, res))
router.get('/', auth, (req, res) => listSurveysController.execute(req, res))
router.get('/:id', auth, (req, res) => findSurveyController.execute(req, res))

module.exports = router