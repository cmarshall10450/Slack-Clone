import React from 'react'
import { withFormik } from 'formik'
import { compose, graphql } from 'react-apollo'
import { Modal, Button, Form, Message } from 'semantic-ui-react'
import { addTeamMember } from '../../queries/teams'
import normalizeErrors from '../../utils/normalizeErrors'

const InvitePeopleModal = ({
  open,
  onClose,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  isSubmitting,
  resetForm,
  teamId,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        resetForm()
        onClose()
      }}
    >
      <Modal.Header>Add Team Member</Modal.Header>
      <Modal.Content>
        {touched.email &&
          errors.email && (
            <Message error>
              <p>{errors.email}</p>
            </Message>
          )}
        <Form>
          <Form.Input
            fluid
            placeholder="User's email..."
            name="email"
            value={values.email}
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
              Add Team Member
            </Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  graphql(addTeamMember),
  withFormik({
    mapPropsToValues: () => ({ email: '' }),
    handleSubmit: async (
      values,
      { props: { onClose, teamId, mutate }, setSubmitting, setErrors }
    ) => {
      const response = await mutate({
        variables: { teamId, email: values.email },
      })
      setSubmitting(false)

      const { ok, errors } = response.data.addTeamMember
      if (ok) {
        onClose()
      } else {
        setErrors(normalizeErrors(errors))
      }
    },
  })
)(InvitePeopleModal)
