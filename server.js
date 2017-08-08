require('./config')
const express = require('express')
const postgraphql = require('postgraphql').postgraphql
const app = express()
// const mutationHooks = require('./src/mutationHooks')

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.redirect('/dist/index.html')
})

// app.use('/api', api)

const schema = postgraphql(
  process.env.DB_CONNECTION_STRING,
  process.env.POSTGRAPHQL_SCHEMA,
  {
    graphiql: process.env.GRAPHIQL === 'true',
    pgDefaultRole: process.env.PG_DEFAULT_ROLE,
    jwtPgTypeIdentifier: process.env.JWT_PG_TYPE_IDENTIFIER,
    jwtSecret: process.env.JWT_SECRET,
    disableDefaultMutations: process.env.DISABLE_DEFAULT_MUTATIONS === 'true',
    // appendPlugins: mutationHooks
  }
)

app.use(schema)

app.listen(3000)

console.log('listening on 3000')
