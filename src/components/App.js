import React from 'react'
import { BrowserRouter as Router,useHistory, Route, Switch } from 'react-router-dom'
import Mainpage from './Mainpage'
import Login from './Login'
import '../assets/css/App.css'

function App() {
  let history = useHistory();


  return (
    <Router>
        <Switch>
        <Route path="/Mainpage" component={Mainpage} />
          <Route path="/"  component={Login} />
        </Switch>
      </Router>
  )
}

export default App

