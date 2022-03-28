const CreateSurveyService = require('./CreateSurveyService')
const DeleteSurveyService = require('./DeleteSurveyService')
const FindSurveyService = require('./FindSurveyService')
const ListSurveysService = require('./ListSurveysService')

const { surveyRepository } = require('../../../infra/db/repositories')

module.exports = {
  createSurveyService: new CreateSurveyService({ surveyRepository }),
  deleteSurveyService: new DeleteSurveyService({ surveyRepository }),
  findSurveyService: new FindSurveyService({ surveyRepository }),
  listSurveysService: new ListSurveysService({ surveyRepository }),
}