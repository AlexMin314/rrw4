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
  },
  Test: {
    loader: () => import('./containers/Test')
  }
})

const Root = props => {
  return (
    <Provider store={{}}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <React.Fragment>
            <Route exact path={'/'} component={Lazy.App} />
            <Route path={'/test'} component={Lazy.Test} />
          </React.Fragment>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default Root
