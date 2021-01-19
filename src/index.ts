import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'

import schema from './graphql/schema'
import rootValue from './graphql/resolvers'

const app = express()

app.use(cors())

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue,
        graphiql: true,
    }),
)

app.listen(process.env.PORT, () => console.log('http://localhost:8081/graphql'))
