const MongoConnection = require('../../../infra/db/MongoConnection')

const SurveyRepository = require('./SurveyRepository')

module.exports = {
  surveyRepository: new SurveyRepository({ mongoConnection: MongoConnection })
}