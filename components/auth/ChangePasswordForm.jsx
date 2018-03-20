import React from 'react'
import { Button, FormGroup, HelpBlock } from 'react-bootstrap'
import { Field } from 'react-final-form'
import FieldGroup from '../FieldGroup'

const ChangePasswordForm = (props) => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <Field
        id="currentPassword"
        name="currentPassword"
        label="Current Password"
        type="password"
        component={FieldGroup}
      />
      <Field
        id="password"
        name="password"
        label="New Password"
        type="password"
        component={FieldGroup}
      />
      <Field
        id="passwordConfirmation"
        name="passwordConfirmation"
        label="Confirm New Password"
        type="password"
        component={FieldGroup}
      />
      {props.submitFailed &&
      <FormGroup validationState="error">
        <HelpBlock>{props.submitError}</HelpBlock>
      </FormGroup>
      }
      <Button
        block
        bsSize="lg"
        bsStyle="primary"
        disabled={(props.submitting || props.submitSucceeded)}
        type="submit"
      >{props.submitting ? 'Changing Password...' : (props.submitSucceeded ? 'Password Changed!' : 'Change Password')}</Button>
    </form>
  </div>
)

export default ChangePasswordForm
