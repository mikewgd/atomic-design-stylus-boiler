import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ ...props }) => {
  if (props.type === 'textarea') {
    return <textarea {...props} />
  } else if (props.type === 'select') {
    return <select {...props} />
  }
  return <input {...props} />
}

Input.propTypes = {
  type: PropTypes.string,
  invalid: PropTypes.bool,
}

Input.defaultProps = {
  type: 'text',
}

export default Input
