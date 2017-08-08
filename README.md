# skidmarks

- make a postgres database
- update /config/index with connection info

```
npm install
```

```
./dbMigrationScripts/dev-db-full-rebuild.sh
```

```
node server.js
```

<a href="http://localhost:3000/graphiql">http://localhost:3000/graphiql</a>

```
query {
  allSkidmarks {
    nodes {
      id
      location: locationByLocationId {
        id
        name
        address1
        city
        lat
        lon
      }
      createdBy: contactByCreatedByContactId {
        id
        email
      }
      comments: commentsBySkidmarkId {
        nodes {
          id
          content
          contact: contactByContactId {
            id
            email
          }
          reactions: commentReactionsByCommentId {
            nodes {
              id
              reaction
              contact: contactByContactId {
                id
                email
              }
            }
          }
        }
      }
    }
  }
}```
