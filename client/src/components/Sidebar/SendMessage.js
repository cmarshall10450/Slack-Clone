import React from 'react'
import { Input } from 'semantic-ui-react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import { compose, graphql } from 'react-apollo'
import { createMessage } from '../../queries/messages'

export const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 10px 20px;
`

const SendMessage = ({
  channelName,
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  isSubmitting,
  resetForm,
}) => (
  <SendMessageWrapper>
    <Input
      name="message"
      value={values.message}
      type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={`Message #${channelName}`}
      fluid
      onKeyDown={e => {
        if (e.keyCode === 13 && !isSubmitting) {
          handleSubmit(e)
        }
      }}
    />
  </SendMessageWrapper>
)

export default compose(
  graphql(createMessage),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    handleSubmit: async (
      values,
      { props: { channelId, mutate }, setSubmitting, resetForm }
    ) => {
      if (!values.message || !values.message.trim()) {
        setSubmitting(false)
        return
      }

      await mutate({
        variables: { channelId, text: values.message },
      })
      resetForm(false)
    },
  })
)(SendMessage)
