import React from 'react'
import decode from 'jwt-decode'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Home, Register, Login, CreateTeam } from './pages'

const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
  try {
    decode(token)
    decode(refreshToken)
  } catch (err) {
    return false
  }

  return true
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }
  />
)

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/create-team" component={CreateTeam} />
    </Switch>
  </BrowserRouter>
)

export default Routes
