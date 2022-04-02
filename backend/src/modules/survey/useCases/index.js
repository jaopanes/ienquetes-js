const CreateSurvey = require('./CreateSurvey')
const DeleteSurvey = require('./DeleteSurvey')
const FindSurvey = require('./FindSurvey')
const ListSurveys = require('./ListSurveys')

const { surveyRepository } = require('../repositories')

module.exports = {
  createSurvey: new CreateSurvey({ surveyRepository }),
  deleteSurvey: new DeleteSurvey({ surveyRepository }),
  findSurvey: new FindSurvey({ surveyRepository }),
  listSurveys: new ListSurveys({ surveyRepository }),
}