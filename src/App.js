import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Place from './Place'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/place/:code' component={Place} />
  </Switch>
);

export default App
