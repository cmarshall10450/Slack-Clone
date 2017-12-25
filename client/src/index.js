import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import Routes from './routes'

const app = <Routes />

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
