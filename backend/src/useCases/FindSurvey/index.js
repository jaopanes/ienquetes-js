const { surveyRepository } = require('../../db/repositories')

const FindSurveyService = require('./FindSurveyService')
const FindSurveyController = require('./FindSurveyController')

const findSurveyService = new FindSurveyService({ surveyRepository })
const findSurveyController = new FindSurveyController({ findSurveyService })

module.exports = {
  findSurveyService,
  findSurveyController,
}