const MongoConnection = require('../../../shared/db/MongoConnection')
const { Survey } = require('../models')

const SurveyRepository = require('./SurveyRepository')

module.exports = {
  surveyRepository: new SurveyRepository({ mongoConnection: MongoConnection, surveyModel: Survey })
}