const CreateSurveyController = require('./CreateSurveyController')
const DeleteSurveyController = require('./DeleteSurveyController')
const FindSurveyController = require('./FindSurveyController')
const ListSurveysController = require('./ListSurveysController')

const {
  createSurveyService,
  deleteSurveyService,
  findSurveyService,
  listSurveysService
} = require('../services')

module.exports = {
  createSurveyController: new CreateSurveyController({ createSurveyService }),
  deleteSurveyController: new DeleteSurveyController({ deleteSurveyService }),
  findSurveyController: new FindSurveyController({ findSurveyService }),
  listSurveysController: new ListSurveysController({ listSurveysService })
}