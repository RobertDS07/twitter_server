import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import schema from './graphql/schema'
import rootValue from './graphql/resolvers'

const app = express()

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue,
        graphiql: true,
    }),
)

app.listen(process.env.PORT || 8081, () =>
    console.log('http://localhost:8081/graphql'),
)
