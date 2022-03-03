const { MongoClient, ReadPreference } = require('mongodb')

module.exports = class MongoConnection {
  static #clientMongo = null

  static getStringURI(env) {
    const enviroments = {
      dev() { return process.env.MONGO_STRINGURI_DEV },
      test() { return process.env.MONGO_STRINGURI_TEST },
      prod() { return process.env.MONGO_STRINGURI_PROD },
    }

    return enviroments[env]()
  }

  static async db() {
    try {
      const stringURI = this.getStringURI(process.env.ENVIRONMENT)
      const params = 'keepAlive=true&socketTimeoutMS=5000&connectTimeoutMS=5000'

      this.#clientMongo = new MongoClient(`${stringURI}?${params}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        readPreference: ReadPreference.PRIMARY_PREFERRED
      })

      const connection = await this.#clientMongo.connect()

      const dbName = `${process.env.MONGO_DBNAME}_${process.env.ENVIRONMENT}`
      const db = connection.db(dbName)

      return db
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static async close() {
    try {
      if (this.#clientMongo) this.#clientMongo.close()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}