const { surveyRepository } = require('../../db/repositories')

const CreateSurveyService = require('./CreateSurveyService')
const CreateSurveyController = require('./CreateSurveyController')

const createSurveyService = new CreateSurveyService({ surveyRepository });
const createSurveyController = new CreateSurveyController({ createSurveyService });

module.exports = {
  createSurveyService,
  createSurveyController,
}