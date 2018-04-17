import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { theme } from 'modules'
import Async from './libs/lazyRoute'

const Lazy = Async({
  options: {
    LoadingComponent: () => <div>Loading...</div>
  },
  App: {
    loader: () => import('./containers/App')
  }
})

const Root = props => {
  return (
    <Provider store={{}}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Route exact path={'/'} component={Lazy.App} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default Root
