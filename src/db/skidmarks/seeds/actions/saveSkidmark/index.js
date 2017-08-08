const clog = require('fbkt-clog')
const escape = require('pg-escape')

function buildSql (createdByContact, locationInfo) {
  return `
  WITH loc AS (
    INSERT INTO skidmarks.location(
      name,
      address1,
      address2,
      city,
      state,
      zip,
      lat,
      lon
    )
    SELECT 
      ${escape('%L', locationInfo.name)}::text,
      COALESCE(${escape('%L', locationInfo.address1)}, ''),
      COALESCE(${escape('%L', locationInfo.address2)}, ''),
      COALESCE(${escape('%L', locationInfo.city)}, ''),
      COALESCE(${escape('%L', locationInfo.state)}, ''),
      COALESCE(${escape('%L', locationInfo.zip)}, ''),
      COALESCE(${escape('%L', locationInfo.lat)}, ''),
      COALESCE(${escape('%L', locationInfo.lon)}, '')
    WHERE NOT EXISTS (
      SELECT id
      FROM skidmarks.location
      WHERE name = ${escape('%L', locationInfo.name)}::text
    )
    RETURNING *
  )
  INSERT INTO skidmarks.skidmark(
    created_by_contact_id,
    location_id
  )
  SELECT 
    ${escape('%L', createdByContact.id)}::uuid,
    loc.id
  FROM loc
  RETURNING *;
`
}

function saveSkidmark (knex, skidmarkInfo, contacts) {
  const createdByContact = contacts.find(c => c.email === skidmarkInfo.contactEmail)
  const locationInfo = skidmarkInfo.location

  const sql = buildSql(createdByContact, locationInfo)
  return knex.raw(sql)
    .then(result => {
      return result.rows[0]
    })
}

module.exports = saveSkidmark
