const { surveyRepository } = require('../../db/repositories')

const ListSurveysService = require('./ListSurveysService')
const ListSurveysController = require('./ListSurveysController')

const listSurveysService = new ListSurveysService({ surveyRepository })
const listSurveysController = new ListSurveysController({ listSurveysService })

module.exports = {
  listSurveysService,
  listSurveysController
}