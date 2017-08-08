 DROP SCHEMA skidmarks CASCADE;

 DELETE FROM public.knex_migrations;

 DROP OWNED BY skidmarks_anonymous;
 DROP OWNED BY skidmarks_user;
 DROP OWNED BY skidmarks_super_admin;

 DROP ROLE IF EXISTS skidmarks_super_admin;
 DROP ROLE IF EXISTS skidmarks_user;
 DROP ROLE IF EXISTS skidmarks_anonymous;

