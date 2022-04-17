const { ok, erro } = require('../../../shared/helpers').returns

module.exports = class UserRepository {
  #collection = 'User'
  #mongoConnection = null
  #userModel = null

  constructor({ mongoConnection, userModel }) {
    this.#mongoConnection = mongoConnection
    this.#userModel = userModel
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
          return new this.#userModel(user)
        })

        return ok({ data: resultWithModelInstance })
      }

      return ok({ data: result })
    } catch (error) {
      console.log(error)

      return erro({
        message: 'Erro ao buscar usuários.',
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
        const resultWithModelInstance = new this.#userModel(result)
        return ok({ data: resultWithModelInstance })
      }

      return ok({ data: result })
    } catch (error) {
      console.log(error)

      return erro({
        message: 'Erro ao buscar um usuário.',
        code: 'REPOSITORY',
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
          message: 'Erro ao inserir usuário.',
          code: 'REPOSITORY',
        })
      }

      return ok({})
    } catch (error) {
      console.log(error)

      return erro({
        message: 'Erro ao inserir usuário.',
        code: 'REPOSITORY',
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
          message: 'Erro ao deletar usuário.',
          code: 'REPOSITORY',
        })
      }

      return ok({})
    } catch (error) {
      console.log(error)

      return erro({
        message: 'Erro ao deletar usuário.',
        code: 'REPOSITORY',
        erros: [error.message],
      })
    }
  }

  async findOneByEmail(email) {
    try {
      const db = await this.#mongoConnection.db()
      const result = await db.collection(this.#collection).findOne(
        { email, "deletedAt": null },
        { _id: 0, deletedAt: 0 }
      )

      if (result) {
        const resultWithModelInstance = new this.#userModel(result)
        return ok({ data: resultWithModelInstance })
      }

      return ok({ data: result })
    } catch (error) {
      console.log(error)

      return erro({
        message: 'Erro ao buscar usuário por email.',
        code: 'REPOSITORY',
        erros: [error.message],
      })
    }
  }

  async findOneByNickname(nickname) {
    try {
      const db = await this.#mongoConnection.db()
      const result = await db.collection(this.#collection).findOne(
        { nickname, "deletedAt": null },
        { _id: 0, deletedAt: 0 }
      )

      if (result) {
        const resultWithModelInstance = new this.#userModel(result)
        return ok({ data: resultWithModelInstance })
      }

      return ok({ data: result })
    } catch (error) {
      console.log(error)

      return erro({
        message: 'Erro ao buscar usuário pelo nickname.',
        code: 'REPOSITORY',
        erros: [error.message],
      })
    }
  }
}