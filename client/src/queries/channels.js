import gql from 'graphql-tag'

export const createChannel = gql`
  mutation($teamId: ID!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`
