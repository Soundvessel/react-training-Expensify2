import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'

const FieldGroup = ({ input, meta, id, label, children, ...rest }) => {
  const hasError = meta.touched && (meta.error || meta.submitError)

  return (
    <FormGroup controlId={id} validationState={hasError ? 'error' : null}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...input} {...rest}>
        {children}
      </FormControl>
      {hasError && <HelpBlock>{meta.error || meta.submitError}</HelpBlock>}
    </FormGroup>
  )
}

FieldGroup.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  // The following props can be provided to be passed through to FormControl
  placeholder: PropTypes.string,
  type: PropTypes.string,
  componentClass: PropTypes.string,
}

export default FieldGroup
