import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer as HotContainer } from 'react-hot-loader'
// Root Component
import Root from './Root'

if (process.env.NODE_ENV === 'development') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React)
}

const render = Component =>
  ReactDOM.render(
    <HotContainer>
      <Component />
    </HotContainer>,
    document.getElementById('react-root')
  )
render(Root)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Root', () => render(Root))
}
