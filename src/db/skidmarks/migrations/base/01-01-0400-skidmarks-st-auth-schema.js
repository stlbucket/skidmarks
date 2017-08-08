
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP SCHEMA IF EXISTS skidmarks_auth CASCADE;
`

const upScript = `
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--||--
DROP SCHEMA IF EXISTS skidmarks_auth CASCADE;
--||--
CREATE SCHEMA skidmarks_auth;
--||--
CREATE TYPE skidmarks_auth.permission_key AS ENUM (
  'Admin',
  'SuperAdmin',
  'Sync'
);
--||--
CREATE TABLE skidmarks_auth.skidmarks_user (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  external_id text,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL DEFAULT current_timestamp,
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  contact_id uuid NOT NULL UNIQUE,
  CONSTRAINT pk_user PRIMARY KEY (id)
);
--skidmarks_auth
ALTER TABLE skidmarks_auth.skidmarks_user ADD CONSTRAINT fk_skidmarks_user_contact FOREIGN KEY ( contact_id ) REFERENCES skidmarks.contact( id );
--||--
alter default privileges revoke execute on functions from public;
--||--
CREATE TABLE skidmarks_auth.skidmarks_user_token (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  skidmarks_user_id uuid NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  expires_at timestamp NOT NULL DEFAULT current_timestamp + interval '20 minute',
  CONSTRAINT pk_skidmarks_user_token PRIMARY KEY (id)
);
--skidmarks_user_token
ALTER TABLE skidmarks_auth.skidmarks_user_token ADD CONSTRAINT fk_skidmarks_user_token_user FOREIGN KEY ( skidmarks_user_id ) REFERENCES skidmarks_auth.skidmarks_user( id );
--||--
SELECT 'SUCCESS';
`
