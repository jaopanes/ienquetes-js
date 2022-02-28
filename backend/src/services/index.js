const { surveyRepository } = require('../db/repositories')

const CreateSurveyService = require('./CreateSurveyService')

module.exports = {
  createUserService = new CreateSurveyService({ surveyRepository })
}