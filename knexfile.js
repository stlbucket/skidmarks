// Update with your config settings.
require('./config')

module.exports = {
  skidmarks_dev: {
    client: 'postgresql',
    connection: process.env.DB_CONNECTION_STRING,
    migrations: {
      directory: './src/db/skidmarks/migrations/base',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './src/db/skidmarks/seeds'
    }
  }
}
