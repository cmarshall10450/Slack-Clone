import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
  margin-bottom: 0;
`

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`

const paddingLeft = 'padding-left: 10px'

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  cursor: pointer;
  &:hover {
    background: #3e313c;
  }
`

const SideBarListHeader = styled.li`
  ${paddingLeft};
`

const PushLeft = styled.div`
  ${paddingLeft};
`

const Green = styled.span`
  color: #38978d;
`

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○')

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <SideBarListItem># {name}</SideBarListItem>
  </Link>
)

const user = ({ id, username }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble />
    {username}
  </SideBarListItem>
)

const Channels = ({
  teamName,
  username,
  teamId,
  channels,
  users,
  onAddChannelClick,
  onInvitePeopleClick,
  isOwner,
}) => (
  <ChannelWrapper>
    <div>
      <PushLeft>
        <TeamNameHeader>{teamName}</TeamNameHeader>
        <Bubble />
        {username}
      </PushLeft>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>
          Channels
          {isOwner && <Icon name="add circle" onClick={onAddChannelClick} />}
        </SideBarListHeader>
        {channels.map(c => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>Direct Messages</SideBarListHeader>
        {users.map(user)}
      </SideBarList>
    </div>
    {isOwner && (
      <div>
        <SideBarList>
          <SideBarListItem onClick={onInvitePeopleClick}>
            <a href="#invite-people">+ invite people</a>
          </SideBarListItem>
        </SideBarList>
      </div>
    )}
  </ChannelWrapper>
)

export default Channels
