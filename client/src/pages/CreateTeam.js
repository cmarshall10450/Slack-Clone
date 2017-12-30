import React, { Component } from 'react'
import { Container, Header, Message, Form, Button } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import { createTeam } from '../queries/teams'

export class CreateTeam extends Component {
  state = {
    name: '',
    errors: {},
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = async () => {
    const { name } = this.state
    let response

    try {
      response = await this.props.mutate({
        variables: { name },
      })
    } catch (err) {
      this.props.history.push('/login')
      return
    }

    const { ok, team, errors } = response.data.createTeam

    if (ok) {
      this.props.history.push(`/view-team/${team.id}`)
    } else {
      const err = {}
      errors.forEach(({ path, message }) => {
        err[path] = message
      })

      this.setState({ errors: err })
    }
  }

  render() {
    const { name, errors } = this.state
    return (
      <Container>
        <Header as="h1">Create Team</Header>
        {errors.name && (
          <Message error>
            <p>{errors.name}</p>
          </Message>
        )}
        <Form>
          <Form.Input
            error={!!errors.email}
            name="name"
            placeholder="Team name..."
            value={name}
            onChange={e => this.onChange(e)}
          />
          <Button positive fluid onClick={() => this.onSubmit()}>
            Create Team
          </Button>
        </Form>
      </Container>
    )
  }
}

export default graphql(createTeam)(CreateTeam)
