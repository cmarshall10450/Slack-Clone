import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import { createServer } from 'http'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { refreshTokens } from './auth'

import models from './models'
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'

const PORT = 5000
const MONGO_URI = 'mongodb://localhost/slack'

const SECRET = 'ojdfnkblsdfznblaefjhbneofjlsdmfhbnl'
const SECRET2 = 'jsoflblsdjfhboefhbiekfbjjasfnausjlf'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express()

const addUser = async (req, res, next) => {
  const token = req.headers['x-token']
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET)
      req.user = user
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token']
      const newTokens = await refreshTokens(
        token,
        refreshToken,
        models,
        SECRET,
        SECRET2
      )
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
        res.set('x-token', newTokens.token)
        res.set('x-refresh-token', newTokens.refreshToken)
      }
      req.user = newTokens.user
    }
  }
  next()
}

app.use(cors('*'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(addUser)

const graphqlEndpoint = '/graphql'
app.use(
  graphqlEndpoint,
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      user: req.user,
      SECRET,
      SECRET2,
    },
  }))
)

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: graphqlEndpoint,
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
  })
)

const server = createServer(app)

mongoose.Promise = Promise
mongoose.connect(MONGO_URI, { useMongoClient: true }).then(
  () => {
    console.log('Connected to DB')
    console.log('Starting server...')
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema,
        },
        {
          server,
          path: '/subscriptions',
        }
      )
    })
  },
  err => {
    console.log(err)
  }
)
