const MongoConnection = require('../../../shared/infra/db/MongoConnection')
const { User } = require('../models')

const UserRepository = require('./UserRepository')

module.exports = {
  userRepository: new UserRepository({ mongoConnection: MongoConnection, userModel: User })
}