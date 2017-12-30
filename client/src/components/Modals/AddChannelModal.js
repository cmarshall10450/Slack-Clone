import React from 'react'
import findIndex from 'lodash/findIndex'
import { withFormik } from 'formik'
import { compose, graphql } from 'react-apollo'
import { Modal, Form, Button } from 'semantic-ui-react'
import { createChannel } from '../../queries/channels'
import { getAllTeams } from '../../queries/teams'

const AddChannelModal = ({
  open,
  onClose,
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  isSubmitting,
  resetForm,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        resetForm()
        onClose()
      }}
    >
      <Modal.Header>Add Channel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            fluid
            placeholder="Channel name..."
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Form.Group widths="equal">
            <Button
              negative
              fluid
              onClick={() => {
                resetForm()
                onClose()
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              positive
              fluid
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              Create Channel
            </Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  graphql(createChannel),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (
      values,
      { props: { onClose, teamId, mutate }, setSubmitting }
    ) => {
      await mutate({
        variables: { teamId, name: values.name },
        optimisticResponse: {
          __typename: 'Mutation',
          createChannel: {
            __typename: 'ChannelResponse',
            ok: true,
            channel: {
              __typename: 'Channel',
              id: -1,
              name: values.name,
            },
          },
        },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel
          if (!ok) {
            return
          }

          const data = store.readQuery({ query: getAllTeams })
          const teamIndex = findIndex(data.teams, ['id', teamId])
          data.teams[teamIndex].channels.push(channel)
          store.writeQuery({ query: getAllTeams, data })
        },
      })

      onClose()
      setSubmitting(false)
    },
  })
)(AddChannelModal)
