const MongoConnection = require('../MongoConnection')

const SurveyRepository = require('./SurveyRepository')

module.exports = {
  surveyRepository: new SurveyRepository({ mongoConnection: MongoConnection })
}