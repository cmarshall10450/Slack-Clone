import gql from 'graphql-tag'

export const createTeam = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`

export const getAllTeams = gql`
  query {
    teams {
      id
      name
      owner {
        id
      }
      members {
        id
        username
      }
      channels {
        id
        name
      }
    }
  }
`

export const addTeamMember = gql`
  mutation($email: String!, $teamId: ID!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`
