module.exports = class SurveyRepository {
  #collection = "Survey"
  #mongoConnection = null

  constructor({ mongoConnection }) {
    this.#mongoConnection = mongoConnection
  }

  async find() { }
  async findOne(id) { }
  async insert(survey) { }
  async delete(id) { }
}