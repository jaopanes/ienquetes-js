const CreateSurveyController = require('./CreateSurveyController')
const DeleteSurveyController = require('./DeleteSurveyController')
const FindSurveyController = require('./FindSurveyController')
const ListSurveysController = require('./ListSurveysController')
const ListSurveysByUserController = require('./ListSurveysByUserController')

const {
  createSurvey,
  deleteSurvey,
  findSurvey,
  listSurveys,
  listSurveysByUser
} = require('../useCases')

module.exports = {
  createSurveyController: new CreateSurveyController({ createSurvey }),
  deleteSurveyController: new DeleteSurveyController({ deleteSurvey }),
  findSurveyController: new FindSurveyController({ findSurvey }),
  listSurveysController: new ListSurveysController({ listSurveys }),
  listSurveysByUserController: new ListSurveysByUserController({ listSurveysByUser })
}