const clog = require('fbkt-clog')
const escape = require('pg-escape')

function buildSql (userInfo) {
  return `
--||--
SELECT skidmarks.register_user(
  ${escape('%L', userInfo.firstName)}, 
  ${escape('%L', userInfo.lastName)},
  ${escape('%L', userInfo.email)}, 
  ${escape('%L', userInfo.cellPhone)}, 
  ${escape('%L', userInfo.username)}, 
  ${escape('%L', userInfo.password)}
);
`
}

function registerUser (knex, userInfo) {
  const sql = buildSql(userInfo)

  return knex.raw(sql)
    .then(result => {
      return result.rows[0]
    })
}

module.exports = registerUser
