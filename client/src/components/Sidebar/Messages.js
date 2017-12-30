import React from 'react'
import { Comment } from 'semantic-ui-react'
import styled from 'styled-components'

export const MessagesWrapper = styled.div`
  grid-column: 3;
  grid-row: 2;
  margin-left: 20px;

  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
`

const message = ({ id, text, user, createdAt }) => (
  <Comment key={`message-${id}`}>
    <Comment.Content>
      <Comment.Author as="a">{user.username}</Comment.Author>
      <Comment.Metadata>{createdAt}</Comment.Metadata>
      <Comment.Text>{text}</Comment.Text>
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
)

const Messages = ({ messages }) => (
  <MessagesWrapper>
    <Comment.Group>{messages.map(message)}</Comment.Group>
  </MessagesWrapper>
)

export default Messages
