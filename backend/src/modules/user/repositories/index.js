const MongoConnection = require('../../../shared/db/MongoConnection')
const User = require('../models/User')

const UserRepository = require('./UserRepository')

module.exports = {
  userRepository: new UserRepository({ mongoConnection: MongoConnection, userModel: User })
}