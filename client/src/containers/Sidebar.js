import React, { Component } from 'react'
import { Channels, Teams } from '../components/Sidebar'
import AddChannelModal from '../components/Modals/AddChannelModal'
import InvitePeopleModal from '../components/Modals/InvitePeopleModal'
import getCurrentUser from '../utils/getCurrentUser'

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
  }

  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault()
    }

    this.setState({
      ...this.state,
      openAddChannelModal: !this.state.openAddChannelModal,
    })
  }

  toggleInvitePeopleModal = e => {
    if (e) {
      e.preventDefault()
    }

    this.setState({
      ...this.state,
      openInvitePeopleModal: !this.state.openInvitePeopleModal,
    })
  }

  render() {
    const { openAddChannelModal, openInvitePeopleModal } = this.state
    const { teams, team } = this.props

    const username = getCurrentUser().username || ''
    const isOwner = team.owner.id === getCurrentUser().id

    return [
      <Teams key="team-sidebar" teams={teams} />,
      <Channels
        key="channel-sidebar"
        teamName={team.name}
        username={username}
        teamId={team.id}
        channels={team.channels}
        isOwner={isOwner}
        users={team.members}
        onAddChannelClick={this.toggleAddChannelModal}
        onInvitePeopleClick={this.toggleInvitePeopleModal}
      />,
      <AddChannelModal
        open={openAddChannelModal}
        onClose={this.toggleAddChannelModal}
        teamId={team.id}
        key="sidebar-add-channel-modal"
      />,
      <InvitePeopleModal
        open={openInvitePeopleModal}
        onClose={this.toggleInvitePeopleModal}
        teamId={team.id}
        key="sidebar-invite-people-modal"
      />,
    ]
  }
}

export default Sidebar
