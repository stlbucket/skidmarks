
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP SCHEMA IF EXISTS skidmarks CASCADE;
`

const upScript = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP SCHEMA IF EXISTS skidmarks CASCADE;
--||--
CREATE SCHEMA skidmarks;
--||--
SET search_path TO skidmarks, public;
--||--
CREATE type reaction_type AS ENUM (
  'Dig',
  'Dis',
  'Fuck_You'
);
--||--
CREATE TABLE skidmark (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL DEFAULT current_timestamp,
  created_by_contact_id uuid NOT NULL,
  location_id uuid NOT NULL,
  CONSTRAINT pk_skidmark PRIMARY KEY (id)
);
--||--
CREATE TABLE attachment (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL DEFAULT current_timestamp,
  created_by_contact_id uuid NOT NULL,
  skidmark_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  url text NOT NULL,
  CONSTRAINT pk_attachment PRIMARY KEY (id)
);
--||--
CREATE TABLE contact (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL DEFAULT current_timestamp,
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  cell_phone text,
  location_id uuid NULL,
  CONSTRAINT pk_contact PRIMARY KEY (id)
);
--||--
CREATE TABLE location (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL DEFAULT current_timestamp,
  name text NOT NULL,
  address1 text,
  address2 text,
  city text,
  state text,
  zip text,
  lat text,
  lon text,
  CONSTRAINT pk_location PRIMARY KEY (id)
);
--||--
CREATE TABLE comment (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL DEFAULT current_timestamp,
  contact_id uuid NOT NULL,
  skidmark_id uuid NOT NULL,
  content text NOT NULL,
  CONSTRAINT pk_comment PRIMARY KEY (id)
);
--||--
CREATE TABLE comment_reaction (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL DEFAULT current_timestamp,
  contact_id uuid NOT NULL,
  comment_id uuid NOT NULL,
  reaction reaction_type NOT NULL,
  CONSTRAINT pk_comment_reaction PRIMARY KEY (id)
);
--||--
--||--
--||-- relations
--||--
--||--
--||-- skidmark
ALTER TABLE skidmark ADD CONSTRAINT fk_skidmark_created_by_contact FOREIGN KEY ( created_by_contact_id ) REFERENCES contact( id );
ALTER TABLE skidmark ADD CONSTRAINT fk_skidmark_location FOREIGN KEY ( location_id ) REFERENCES location( id );
--||-- attachment
ALTER TABLE attachment ADD CONSTRAINT fk_attachment_skidmark FOREIGN KEY ( skidmark_id ) REFERENCES skidmark( id );
--||-- comment
ALTER TABLE comment ADD CONSTRAINT fk_comment_skidmark FOREIGN KEY ( skidmark_id ) REFERENCES skidmark( id );
ALTER TABLE comment ADD CONSTRAINT fk_comment_contact FOREIGN KEY ( contact_id ) REFERENCES contact( id );
--||-- comment_reaction
ALTER TABLE comment_reaction ADD CONSTRAINT fk_comment_reaction_comment FOREIGN KEY ( comment_id ) REFERENCES comment( id );
ALTER TABLE comment_reaction ADD CONSTRAINT fk_comment_reaction_contact FOREIGN KEY ( contact_id ) REFERENCES contact( id );
--||--
SET search_path TO public;
SELECT 'SUCCESS';
`
