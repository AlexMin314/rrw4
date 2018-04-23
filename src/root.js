import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { theme, lazyRoute as Async } from 'modules'

// Might no need additional options...
// import(
//   /* webpackChunkName: "test" */
//   /* webpackPrefetch: true */
//   "Component"
// )
// import(/* webpackPreload: true */ "Components")
const Lazy = Async({
  options: {
    LoadingComponent: () => <div>Loading...</div>
  },
  App: {
    loader: () => import('./containers/App')
  }
})

// TODO: webpack plugin for hot loading

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
