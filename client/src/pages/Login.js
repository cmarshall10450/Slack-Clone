import React, { Component } from 'react'
import { Header, Container, Form, Button, Message } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import { login } from '../queries/users'

export class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = async () => {
    const { email, password } = this.state
    const response = await this.props.mutate({
      variables: { email, password },
    })

    const { ok, token, refreshToken, errors } = response.data.login

    if (ok) {
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      this.props.history.push('/')
    } else {
      const err = {}
      errors.forEach(({ path, message }) => {
        err[path] = message
      })

      this.setState({ email: '', password: '', errors: err })
    }
  }

  render() {
    const { email, password, errors } = this.state
    return (
      <Container>
        <Header as="h1">Login</Header>
        {(errors.email || errors.password) && (
          <Message error header="Invalid Credentials" />
        )}
        <Form>
          <Form.Input
            error={!!errors.email}
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => this.onChange(e)}
          />
          <Form.Input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => this.onChange(e)}
          />
          <Button positive fluid onClick={() => this.onSubmit()}>
            Login
          </Button>
        </Form>
      </Container>
    )
  }
}

export default graphql(login)(Login)
