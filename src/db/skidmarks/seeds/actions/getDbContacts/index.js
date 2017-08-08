const clog = require('fbkt-clog')

function buildSql () {
  return `
--||--
SELECT * FROM skidmarks.contact;
`
}

function registerUser (knex) {
  const sql = buildSql()

  return knex.raw(sql)
    .then(result => {
      return result.rows
    })
}

module.exports = registerUser
