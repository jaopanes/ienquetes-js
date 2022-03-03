const { surveyRepository } = require('../db/repositories')

const CreateSurveyService = require('./CreateSurveyService')
const ListSurveysService = require('./ListSurveysService')

const services = {
  createSurvey: () => new CreateSurveyService({ surveyRepository }),
  listSurveys: () => new ListSurveysService({ surveyRepository })
}

module.exports = services
