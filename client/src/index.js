import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'
import { ApolloProvider } from 'react-apollo'

import Routes from './routes'
import client from './apollo'

const app = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
