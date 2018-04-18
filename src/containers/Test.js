import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  width: 200px;
  height: 80px;
`

const Test = props => {
  return (
    <div>
      hello Test
      <Button onClick={() => console.log('pressed') || props.history.push('/')}>Go to</Button>
    </div>
  )
}

export default Test
