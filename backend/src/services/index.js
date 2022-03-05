const { surveyRepository, userRepository } = require('../db/repositories')

const CreateSurveyService = require('./Survey/CreateSurveyService')
const ListSurveysService = require('./Survey/ListSurveysService')
const FindSurveyService = require('./Survey/FindSurveyService')
const DeleteSurveyService = require('./Survey/DeleteSurveyService')

const RegisterUserService = require('./User/RegisterUserService')

const services = {
  createSurvey: () => new CreateSurveyService({ surveyRepository }),
  listSurveys: () => new ListSurveysService({ surveyRepository }),
  findSurvey: () => new FindSurveyService({ surveyRepository }),
  deleteSurvey: () => new DeleteSurveyService({ surveyRepository }),

  registerUser: () => new RegisterUserService({ userRepository })
}

module.exports = services
