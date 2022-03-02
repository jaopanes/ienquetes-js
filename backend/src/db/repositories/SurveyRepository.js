const { returns: { ok, erro } } = require('../../common')
module.exports = class SurveyRepository {
  #collection = "Survey"
  #mongoConnection = null

  constructor({ mongoConnection }) {
    this.#mongoConnection = mongoConnection
  }

  async find() { }
  async findOne(id) { }

  async insert(survey) {

    try {
      const db = await this.#mongoConnection.db()
      const result = await db.collection(this.#collection).insertOne(survey)

      if (!result.acknowledged) {
        return erro("There was an error entering the record", "MONGO_1")
      }

      return ok()
    } catch (error) {
      console.log(error)
      return erro(error.message, "MONGO_2")
    }
  }

  async delete(id) { }
}