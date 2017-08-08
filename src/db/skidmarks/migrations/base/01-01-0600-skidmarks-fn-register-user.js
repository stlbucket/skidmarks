
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
drop function if exists skidmarks.register_user(text, text, text, text, text, text);
`

const upScript = `
create or replace function skidmarks.register_user(
  _first_name text,
  _last_name text,
  _email text,
  _cell_phone text,
  _username text,
  _password text
) returns skidmarks.contact as $$
declare
  _contact skidmarks.contact;
begin
  WITH new_contact AS (
    INSERT INTO skidmarks.contact(
      first_name,
      last_name,
      email,
      cell_phone
    )
    SELECT
      _first_name,
      _last_name,
      _email,
      _cell_phone
    WHERE NOT EXISTS(
      SELECT id FROM skidmarks.contact WHERE email = _email
    )
    RETURNING *
  )  
  INSERT INTO skidmarks_auth.skidmarks_user (contact_id, username, password_hash) 
  SELECT id, _username, public.crypt(_password, public.gen_salt('bf'))
  FROM new_contact
  WHERE NOT EXISTS(
    SELECT *
    FROM skidmarks_auth.skidmarks_user su
    WHERE su.username = _username
  );

  SELECT * INTO _contact FROM skidmarks.contact WHERE email = _email;
  
  RETURN _contact;
end;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION skidmarks.register_user(text, text, text, text, text, text) TO skidmarks_anonymous;
--||--
SELECT 'SUCCESS';
`
