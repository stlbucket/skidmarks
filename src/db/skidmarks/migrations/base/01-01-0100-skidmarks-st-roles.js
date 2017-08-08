
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP OWNED BY skidmarks_super_admin;
DROP ROLE IF EXISTS skidmarks_super_admin;
--||--
DROP OWNED BY skidmarks_anonymous;
DROP ROLE IF EXISTS skidmarks_anonymous;
--||--
DROP OWNED BY skidmarks_user;
DROP ROLE IF EXISTS skidmarks_user;
`

const upScript = `
create role skidmarks_super_admin login password 'skidmarks@)R)';
--||--
create role skidmarks_anonymous;
grant skidmarks_anonymous to skidmarks_super_admin;
--||--
create role skidmarks_user;
grant skidmarks_user to skidmarks_super_admin;
--||--
SELECT 'SUCCESS';
`
