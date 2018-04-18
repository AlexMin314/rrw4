import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { theme, lazyRoute as Async } from 'modules'

const Lazy = Async({
  options: {
    LoadingComponent: () => <div>Loading...</div>,
    preloadAll: true // preload every async components
  },
  App: {
    loader: () => import('./containers/App'),
    preload: true // preload selected async component
  }
})

const Root = props => {
  return (
    <Provider store={{}}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <React.Fragment>
            <Route strict path={'/'} component={Lazy.App} />
          </React.Fragment>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default Root
