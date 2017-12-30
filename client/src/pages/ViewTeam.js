import React from 'react'
import find from 'lodash/find'
import { graphql } from 'react-apollo'
import { getAllTeams } from '../queries/teams'
import { AppLayout, Header, SendMessage } from '../components/Sidebar'
import Sidebar from '../containers/Sidebar'
import { Redirect } from 'react-router-dom'
import MessageContainer from '../containers/MessageContainer'

const ViewTeam = ({
  params,
  data: { loading, teams },
  match: { params: { teamId, channelId } },
}) => {
  if (loading) {
    return null
  }

  if (!teams.length) {
    return <Redirect to="/create-team" />
  }

  const team = teamId ? find(teams, team => team.id === teamId) : teams[0]

  if (!team) {
    return <Redirect to="/view-team" />
  }

  const channel = channelId
    ? find(team.channels, channel => channel.id === channelId)
    : team.channels[0]

  if (!channel) {
    return <Redirect to={`/view-team/${team.id}/`} />
  }

  return (
    <AppLayout>
      <Sidebar teams={teams} team={team} />
      {channel && <Header channelName={channel.name} />}
      {channel && <MessageContainer channelId={channel.id} />}
      {channel && (
        <SendMessage channelName={channel.name} channelId={channel.id} />
      )}
    </AppLayout>
  )
}

export default graphql(getAllTeams)(ViewTeam)
