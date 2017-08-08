
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP VIEW IF EXISTS skidmarks.vw_skidmark;
`

const upScript = `
CREATE VIEW skidmarks.vw_skidmark AS 
  SELECT 
    c.email created_by_email,
    l.name,
    l.address1,
    l.address2,
    l.city,
    l.state,
    l.zip,
    l.lat,
    l.lon,
    s.id,
    s.created_by_contact_id,
    l.id location_id
  FROM skidmarks.skidmark s
  JOIN skidmarks.location l ON s.location_id = l.id
  JOIN skidmarks.contact c ON s.created_by_contact_id = c.id;
--||--
GRANT SELECT ON TABLE skidmarks.vw_skidmark TO skidmarks_anonymous, skidmarks_user;
--||--
SELECT 'SUCCESS';
`
