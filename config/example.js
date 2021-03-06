process.env.DB_CONNECTION_STRING = 'postgres://USER:PASSWORD@localhost/skidmarks'
process.env.SCHEMAS_TO_GRAPHQL = [ 'skidmarks' ]
process.env.PG_DEFAULT_ROLE = 'skidmarks_anonymous'
process.env.GRAPHIQL = true
process.env.POSTGRAPHQL_SCHEMA = 'skidmarks'
process.env.JWT_PG_TYPE_IDENTIFIER = 'skidmarks.jwt_token'
process.env.JWT_SECRET = 'S*PERDuPER$#(R#T'
process.env.DISABLE_DEFAULT_MUTATIONS = false
