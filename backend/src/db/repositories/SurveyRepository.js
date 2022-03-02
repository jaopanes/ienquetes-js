const { ok, erro } = require('../../common')
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
        return erro({
          message: 'There was an error entering the record',
          code: 'MONGO_1',
        })
      }

      return ok({})
    } catch (error) {
      console.log(error)

      return erro({
        message: 'There was an error entering the record',
        code: 'MONGO_2',
        erros: [error.message],
      })
    }
  }

  async delete(id) { }
}