const { ok, erro } = require('../../../util')
module.exports = class SurveyRepository {
  #collection = 'Survey'
  #mongoConnection = null
  #surveyModel = null

  constructor({ mongoConnection, surveyModel }) {
    this.#mongoConnection = mongoConnection
    this.#surveyModel = surveyModel
  }

  async find() {
    try {
      const db = await this.#mongoConnection.db()
      const result = await db.collection(this.#collection)
        .find({ "deletedAt": null })
        .project({ _id: 0, deletedAt: 0 })
        .toArray()

      if (result.length) {
        const resultWithModelInstance = result.map(user => {
          return new this.#surveyModel(user).secureReturn()
        })

        return ok({ data: resultWithModelInstance })
      }

      return ok({ data: result })
    } catch (error) {
      console.log(error)

      return erro({
        message: 'There was an error occurred while listinig records',
        code: 'REPOSITORY',
        erros: [error.message],
      })
    }
  }

  async findOne(id) {
    try {
      const db = await this.#mongoConnection.db()
      const result = await db.collection(this.#collection).findOne(
        { id, "deletedAt": null },
        { _id: 0, deletedAt: 0 }
      )

      if (result) {
        const resultWithModelInstance = new this.#surveyModel(result).secureReturn()
        return ok({ data: resultWithModelInstance })
      }

      return ok({ data: result })
    } catch (error) {
      console.log(error)

      return erro({
        message: 'There was an error occurred finding record',
        code: 'REPOSITORY',
        erros: [error.message],
      })
    }
  }

  async insert(survey) {
    try {
      const db = await this.#mongoConnection.db()
      const result = await db.collection(this.#collection).insertOne(survey)

      if (!result.acknowledged) {
        return erro({
          message: 'There was an error entering the record',
          code: 'REPOSITORY',
        })
      }

      return ok({})
    } catch (error) {
      console.log(error)

      return erro({
        message: 'There was an error entering the record',
        code: 'REPOSITORY',
        erros: [error.message],
      })
    }
  }

  async safeDelete(survey) {
    try {
      const db = await this.#mongoConnection.db()
      const result = await db.collection(this.#collection).updateOne(
        { "id": survey.id },
        {
          $set: {
            title: survey.title,
            initiatedAt: survey.initiatedAt,
            endedAt: survey.endedAt,
            options: survey.options,
            createdAt: survey.createdAt,
            updatedAt: survey.updatedAt,
            deletedAt: survey.deletedAt,
          }
        }
      )

      if (!result.acknowledged || result.modifiedCount !== 1) {
        return erro({
          message: 'There was an error deleting the record',
          code: 'REPOSITORY',
        })
      }

      return ok({})
    } catch (error) {
      console.log(error)

      return erro({
        message: 'There was an error deleting the record',
        code: 'REPOSITORY',
        erros: [error.message],
      })
    }
  }
}