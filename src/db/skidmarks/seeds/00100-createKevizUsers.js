const keviz = require('./keviz.json')
const registerUser = require('./actions/registerUser')

exports.seed = function (knex, Promise) {
  return Promise.mapSeries(
    keviz.users,
    user => {
      return registerUser(knex, user)
    }
  )
}
