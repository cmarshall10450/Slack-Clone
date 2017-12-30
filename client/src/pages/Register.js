import React, { Component } from 'react'
import { Header, Container, Form, Button, Message } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import { register } from '../queries/users'

export class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    errors: {},
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = async () => {
    const { username, email, password } = this.state

    this.setState({ ...this.state, errors: {} })

    const response = await this.props.mutate({
      variables: { username, email, password },
    })

    const { ok, errors } = response.data.register

    if (ok) {
      this.props.history.push('/')
    } else {
      const err = {}
      errors.forEach(({ path, message }) => {
        err[path] = message
      })

      this.setState({ ...this.state, errors: err })
    }
  }

  render() {
    const { username, email, password, errors } = this.state
    return (
      <Container>
        <Header as="h1">Register</Header>
        {(errors.username || errors.email || errors.password) && (
          <Message
            error
            header="There were some errors with your submission"
            list={Object.values(errors)}
          />
        )}
        <Form>
          <Form.Input
            error={!!errors.username}
            name="username"
            placeholder="Username"
            value={username}
            onChange={e => this.onChange(e)}
          />
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
            Register
          </Button>
        </Form>
      </Container>
    )
  }
}

export default graphql(register)(Register)
