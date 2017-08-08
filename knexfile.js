// Update with your config settings.

module.exports = {
  skidmarks_dev: {
    client: 'postgresql',
    connection: 'postgres://postgres:fbktp@$sword@localhost/skidmarks',
    migrations: {
      directory: './src/db/skidmarks/migrations/base',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './src/db/skidmarks/seeds'
    }
  }
}
