import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import Promise from 'bluebird'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import models from './models'
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'

const PORT = 5000
const MONGO_URI = 'mongodb://localhost/slack'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express()

app.use(cors('*'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const graphqlEndpoint = '/graphql'
app.use(
  graphqlEndpoint,
  graphqlExpress({
    schema,
    context: {
      models,
      user: {
        id: '5a40ed64ea9c76358029110b',
      },
    },
  })
)
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }))

mongoose.Promise = Promise
mongoose.connect(MONGO_URI, { useMongoClient: true }).then(
  () => {
    console.log('Connected to DB')
    console.log('Starting server...')
    app.listen(PORT, () => console.log('Server running on port:', PORT))
  },
  err => {
    console.log(err)
  }
)
