const MongoConnection = require('../../../shared/db/MongoConnection')

const SurveyRepository = require('./SurveyRepository')

module.exports = {
  surveyRepository: new SurveyRepository({ mongoConnection: MongoConnection })
}