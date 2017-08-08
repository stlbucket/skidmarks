# skidmarks

```
git clone https://github.com/stlbucket/skidmarks.git
```

```
npm install
```

- make a postgres database
- copy ./config/example.js to ./config/index.js and update with connection info

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
}
```


```
mutation {
  authenticate (input: {
    username: "ryan"
    password: "$ECR#T"
  }) {
    jwtToken
  }
}
```
