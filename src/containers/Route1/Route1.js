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

const Route1 = props => {
  const { history } = props
  return (
    <TempWrapper>
      <div>Welcome to Route 12345</div>
      <Button onClick={() => history.push('/2')}>Go to Route 2</Button>
    </TempWrapper>
  )
}

Route1.propTypes = {
  history: PropTypes.object
}

export default Route1
