const { ok, erro } = require('../../common')
module.exports = class UserRepository {
  #collection = 'User'
  #mongoConnection = null

  constructor({ mongoConnection }) {
    this.#mongoConnection = mongoConnection
  }

  async find() {
    try {
      const db = await this.#mongoConnection.db()
      const result = await db.collection(this.#collection)
        .find({ "deletedAt": null })
        .project({ _id: 0, deletedAt: 0 })
        .toArray()

      return ok({ data: result })
    } catch (error) {
      console.log(error)

      return erro({
        message: 'There was an error occurred while listinig records',
        code: 'MONGO_2',
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

      return ok({ data: result })
    } catch (error) {
      console.log(error)

      return erro({
        message: 'There was an error occurred finding record',
        code: 'MONGO_2',
        erros: [error.message],
      })
    }
  }

  async insert(user) {
    try {
      const db = await this.#mongoConnection.db()
      const result = await db.collection(this.#collection).insertOne(user)

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

  async safeDelete(user) {
    try {
      const db = await this.#mongoConnection.db()
      const result = await db.collection(this.#collection).updateOne(
        { "id": user.id },
        {
          $set: {
            name: user.name,
            nickname: user.nickname,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
          }
        }
      )

      if (!result.acknowledged || result.modifiedCount !== 1) {
        return erro({
          message: 'There was an error deleting the record',
          code: 'MONGO_1',
        })
      }

      return ok({})
    } catch (error) {
      console.log(error)

      return erro({
        message: 'There was an error deleting the record',
        code: 'MONGO_2',
        erros: [error.message],
      })
    }
  }
}