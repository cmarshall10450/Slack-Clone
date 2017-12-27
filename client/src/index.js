import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

import Routes from './routes'

const httpLink = new HttpLink({ uri: 'http://localhost:5000/graphql' })
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'x-token': localStorage.getItem('token') || null,
      'x-refresh-token': localStorage.getItem('refreshToken') || null,
    },
  })

  return forward(operation)
})

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext()
    const { response: { headers } } = context

    if (headers) {
      const token = headers.get('x-token')
      const refreshToken = headers.get('x-refresh-token')

      if (token) {
        localStorage.setItem('token', token)
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
      }
    }
    return response
  })
})

const client = new ApolloClient({
  link: concat(afterwareLink, concat(authMiddleware, httpLink)),
  cache: new InMemoryCache(),
})

const app = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
