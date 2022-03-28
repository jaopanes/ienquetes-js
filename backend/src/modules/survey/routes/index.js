const router = require("express").Router()

const { createSurveyController, deleteSurveyController, findSurveyController, listSurveysController } = require('../controllers')

router.post('/', (req, res) => createSurveyController.execute(req, res))
router.delete('/:id', (req, res) => deleteSurveyController.execute(req, res))
router.get('/', (req, res) => listSurveysController.execute(req, res))
router.get('/:id', (req, res) => findSurveyController.execute(req, res))

module.exports = router