
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
REVOKE execute ON FUNCTION skidmarks.authenticate(text, text) FROM skidmarks_anonymous, skidmarks_user;
--||--
DROP FUNCTION IF EXISTS skidmarks.authenticate(text, text);
--||--
DROP TYPE IF EXISTS skidmarks.jwt_token;
--||--
DROP FUNCTION IF EXISTS skidmarks.current_contact();
`

const upScript = `
--||--
create type skidmarks.jwt_token as (
  role text,
  contact_id uuid
);
--||--
create function skidmarks.authenticate(
  username text,
  password text
) returns skidmarks.jwt_token as $$
declare
  account skidmarks_auth.skidmarks_user;
begin
  select a.* into account
  from skidmarks_auth.skidmarks_user as a
  where a.username = $1;

  if account.password_hash = crypt(password, account.password_hash) then
    return ('skidmarks_user', account.contact_id)::skidmarks.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;
--||--
comment on function skidmarks.authenticate(text, text) is 'Creates a JWT token that will securely identify a contact and give them certain permissions.';
--||--
create function skidmarks.current_contact() returns skidmarks.contact as $$
  select *
  from skidmarks.contact
  where id = current_setting('jwt.claims.contact_id')::uuid
$$ language sql stable;
--||--
comment on function skidmarks.current_contact() is 'Gets the contact who was identified by our JWT.';
--||--
GRANT execute ON FUNCTION skidmarks.authenticate(text, text) TO skidmarks_anonymous, skidmarks_user;
--||--
SELECT 'SUCCESS';
`
