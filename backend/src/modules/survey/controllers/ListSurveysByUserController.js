const { statusCodes } = require("../../../util")

module.exports = class ListSurveysByUserController {
  #listSurveysByUser = null

  constructor({ listSurveysByUser }) {
    this.#listSurveysByUser = listSurveysByUser
  }

  async execute(req, res) {
    try {
      const { userId } = req.params
      const { userAuthorized } = req

      if (userAuthorized.id !== userId) {
        return res.status(403).json({
          message: 'Forbidden',
          code: 'FORBIDDEN',
          erros: [
            'User unauthorized to acess list surveys'
          ]
        })
      }

      const listSurveysByUser = await this.#listSurveysByUser.execute({ userId })
      const statusCode = statusCodes[listSurveysByUser.code]

      if (!listSurveysByUser.ok) {
        return res.status(statusCode).json({
          message: listSurveysByUser.message,
          code: listSurveysByUser.code,
          erros: listSurveysByUser.erros
        })
      }

      return res.status(statusCode).json(listSurveysByUser.data)
    } catch (error) {
      console.log(error)

      return res.status(500).json({ message: 'Foram encontrados erros ao listar enquetes do usuário.', code: 'CONTROLLER', erros: [error.message] })
    }
  }
}