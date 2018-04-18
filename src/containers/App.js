import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { lazyRoute as Async } from 'modules'

const Lazy = Async({
  options: {
    LoadingComponent: () => <div>Loading...</div>
  },
  Route1: {
    loader: () => import('./Route1/Route1')
  },
  Route2: {
    loader: () => import('./Route2/Route2'),
    prefetch: () => {} // action
  }
})

const App = props => {
  return (
    <Switch>
      <Route exact path={'/'} component={Lazy.Route1} />
      <Route exact path={'/2'} component={Lazy.Route2} />
    </Switch>
  )
}

export default App
