
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
`

const upScript = `
GRANT usage ON SCHEMA skidmarks TO skidmarks_anonymous, skidmarks_user;
GRANT select, update, delete ON TABLE skidmarks.skidmark TO skidmarks_user, skidmarks_anonymous;
GRANT select, update, delete ON TABLE skidmarks.contact TO skidmarks_user, skidmarks_anonymous;
GRANT select, update, delete ON TABLE skidmarks.location TO skidmarks_user, skidmarks_anonymous;
GRANT select, update, delete ON TABLE skidmarks.comment TO skidmarks_user, skidmarks_anonymous;
GRANT select, update, delete ON TABLE skidmarks.comment_reaction TO skidmarks_user, skidmarks_anonymous;
--||--
--ALTER TABLE skidmarks.quotable_inventory_item ENABLE ROW LEVEL SECURITY;
--CREATE POLICY select_quotable_inventory_item ON skidmarks.quotable_inventory_item FOR SELECT
--  USING (seller_id = (SELECT company_id FROM skidmarks.contact WHERE id = current_setting('jwt.claims.contact_id')::uuid));
--||--
SELECT 'SUCCESS';
`
