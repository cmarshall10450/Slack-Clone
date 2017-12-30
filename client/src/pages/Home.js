import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { allUsers } from '../queries/users'
import { Container, Button } from 'semantic-ui-react'

export class Home extends Component {
  render() {
    const { loading, users } = this.props.data

    if (loading) {
      return <p>Loading...</p>
    }

    return (
      <Container>
        <Link to="/create-team">
          <Button fluid>Create Team</Button>
        </Link>
        <Link to="/view-team">
          <Button fluid>View Team</Button>
        </Link>
        {users.map(user => (
          <h1 key={user.id}>
            {user.username} | {user.email}
          </h1>
        ))}
      </Container>
    )
  }
}

export default graphql(allUsers)(Home)
