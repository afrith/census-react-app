import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Place from './Place'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path='/'><Home /></Route>
    <Route path='/place/:code'><Place /></Route>
  </Switch>
);

export default App
