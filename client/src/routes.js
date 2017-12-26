import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home, Register, Login } from './pages'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
)

export default Routes
