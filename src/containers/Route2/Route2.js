import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button } from 'components'

const TempWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`

const Route2 = props => {
  const { history } = props
  return (
    <TempWrapper>
      <div>Welcome to Route 2</div>
      <Button onClick={() => history.push('/')}>Go to Route 1</Button>
    </TempWrapper>
  )
}

Route2.propTypes = {
  history: PropTypes.object
}

export default Route2
