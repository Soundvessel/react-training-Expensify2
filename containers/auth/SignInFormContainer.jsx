import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import SignInForm from '../../components/auth/SignInForm'
import { mapFinalFormErrors } from '../../lib/utils'
import { signIn } from '../../modules/auth'

const mapErrors = mapFinalFormErrors('Failed to sign in')

const onSubmit = (signIn) => (values) => (
  signIn(values)
    .catch(mapErrors)
)

const validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Email is required'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  return errors
}

let SignInFormContainer = ({ signIn }) => (
  <Form
    component={SignInForm}
    onSubmit={onSubmit(signIn)}
    validate={validate}
  />
)

SignInFormContainer = connect(null, { signIn })(SignInFormContainer)

export default SignInFormContainer
