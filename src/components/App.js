import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage, NotFoundPage, SamplePage } from 'components'
import { GoogleTagManager } from 'containers'

const App = () => {
  return (
    <React.Fragment>
      <GoogleTagManager />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/sample" component={SamplePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  )
}

export default App
