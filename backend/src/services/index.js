const { surveyRepository } = require('../db/repositories')

const CreateSurveyService = require('./CreateSurveyService')
const ListSurveysService = require('./ListSurveysService')
const FindSurveyService = require('./FindSurveyService')
const DeleteSurveyService = require('./DeleteSurveyService')

const services = {
  createSurvey: () => new CreateSurveyService({ surveyRepository }),
  listSurveys: () => new ListSurveysService({ surveyRepository }),
  findSurvey: () => new FindSurveyService({ surveyRepository }),
  deleteSurvey: () => new DeleteSurveyService({ surveyRepository })
}

module.exports = services
