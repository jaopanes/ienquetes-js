const { surveyRepository } = require('../../db/repositories')

const DeleteSurveyService = require('./DeleteSurveyService')
const DeleteSurveyController = require('./DeleteSurveyController')

const deleteSurveyService = new DeleteSurveyService({ surveyRepository })
const deleteSurveyController = new DeleteSurveyController({ deleteSurveyService })

module.exports = {
  deleteSurveyService,
  deleteSurveyController,
}