const clog = require('fbkt-clog')
const escape = require('pg-escape')

function buildSql (commentId, contactId, reaction) {
  return `
  INSERT INTO skidmarks.comment_reaction(
    comment_id,
    contact_id,
    reaction
  )
  SELECT
    ${escape('%L', commentId)}::uuid,
    ${escape('%L', contactId)}::uuid,
    ${escape('%L', reaction)}::skidmarks.reaction_type
  RETURNING *;
`
}

function saveSkidmarkComment (knex, commentId, contacts, commentReactionInfo) {
  const createdByContact = contacts.find(c => c.email === commentReactionInfo.contactEmail)

  const sql = buildSql(commentId, createdByContact.id, commentReactionInfo.reaction)

  return knex.raw(sql)
    .then(result => {
      return result.rows[0]
    })
}

module.exports = saveSkidmarkComment
