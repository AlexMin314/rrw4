import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Temporal Component for testing

const StyledButton = styled.button`
  width: 250px;
  height: 100px;
`

const Button = props => {
  const { text, children, onClick } = props
  return (
    <StyledButton onClick={onClick}>
      {text || children}
    </StyledButton>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string
}

export default Button
