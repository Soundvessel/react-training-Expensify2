import React from 'react'
import { Button, FormGroup, HelpBlock, Image, Panel } from 'react-bootstrap'
import { Field } from 'react-final-form'
import FieldGroup from '../FieldGroup'

const SignInForm = (props) => (
  <Panel>
    <Image
      alt="Sign In"
      src="/static/images/logo.svg"
      responsive
    />
    <form onSubmit={props.handleSubmit}>
      <Field
        id="email"
        name="email"
        label="Email"
        type="email"
        component={FieldGroup}
      />
      <Field
        id="password"
        name="password"
        label="Password"
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
        disabled={props.submitting}
        type="submit"
      >{props.submitting ? 'Signing In...' : 'Sign In'}</Button>
    </form>
  </Panel>
)

export default SignInForm
