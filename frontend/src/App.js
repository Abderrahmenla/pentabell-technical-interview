import React from 'react'
import { BrowserRouter as Router, Route,Redirect,Switch } from 'react-router-dom'

const Signin = React.lazy(() => import("./pages/signin"));
const Signup = React.lazy(() => import("./pages/signup"));
const Todos = React.lazy(() => import("./pages/todos"));
const ForgotPassword = React.lazy(() => import("./pages/forgot-password"));
const ResetedPassword = React.lazy(() => import("./pages/reseted-password"));

const App = () => {
  return (
    <React.Suspense fallback={null}>
    <Router>
      <Switch>
          <Route path='/todos/:id' component={Todos} exact />
          <Route path='/signin' component={Signin} exact />
          <Route path='/signup' component={Signup} exact />
          <Route path='/forgot-password' component={ForgotPassword} exact />
          <Route path='/reseted-password' component={ResetedPassword} exact />
          <Redirect from='/' to='/signup' />
      </Switch>     
    </Router>
    </React.Suspense>
  )
}

export default App
