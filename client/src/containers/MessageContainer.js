import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {
  getAllMessages,
  newChannelMessageSubscription,
} from '../queries/messages'
import Messages from '../components/Sidebar/Messages'

class MessageContainer extends Component {
  componentWillMount = () => {
    this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId: this.props.channelId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        console.log('PREV:', prev)
        console.log('SUBSCRIPTION DATA:', subscriptionData)

        if (!subscriptionData) {
          return prev
        }

        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage],
        }
      },
    })
  }

  render() {
    const { data: { loading, messages } } = this.props
    if (loading) {
      return null
    }

    return <Messages messages={messages} />
  }
}

export default graphql(getAllMessages, {
  variables: ({ channelId }) => ({
    channelId,
  }),
  options: {
    fetchPolicy: 'network-only',
  },
})(MessageContainer)
