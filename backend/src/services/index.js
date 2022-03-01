const { surveyRepository } = require('../db/repositories')

const CreateSurveyService = require('./CreateSurveyService')

const services = {
  createSurvey: () => new CreateSurveyService({ surveyRepository })
}

module.exports = services
