const clog = require('fbkt-clog')
const escape = require('pg-escape')

function buildSql (skidmarkId, contactId, content) {
  return `
  INSERT INTO skidmarks.comment(
    skidmark_id,
    contact_id,
    content
  )
  SELECT
    ${escape('%L', skidmarkId)}::uuid,
    ${escape('%L', contactId)}::uuid,
    COALESCE(${escape('%L', content)}, 'WHY YOU NO COMMENT?')
  RETURNING *;
`
}

function saveSkidmarkComment (knex, skidmarkId, contacts, commentInfo) {
  const createdByContact = contacts.find(c => c.email === commentInfo.contactEmail)

  const sql = buildSql(skidmarkId, createdByContact.id, commentInfo.content)

  return knex.raw(sql)
    .then(result => {
      return result.rows[0]
    })
}

module.exports = saveSkidmarkComment
