module.exports = class SurveyRepository {
  #collection = "Survey"
  #db = null

  constructor({ db }) {
    this.#db = db
  }

  async find() { }
  async findOne(id) { }
  async insert(survey) { }
  async delete(id) { }
}