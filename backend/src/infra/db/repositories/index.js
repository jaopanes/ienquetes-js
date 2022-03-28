const MongoConnection = require('../MongoConnection')

const SurveyRepository = require('./SurveyRepository')
const UserRepository = require('./UserRepository')

module.exports = {
  surveyRepository: new SurveyRepository({ mongoConnection: MongoConnection }),
  userRepository: new UserRepository({ mongoConnection: MongoConnection })
}