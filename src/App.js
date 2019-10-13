import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Home from './Home'
import Place from './Place'
import './App.css'

const App = () => (
  <Container>
    <Switch>
      <Route exact path='/'><Home /></Route>
      <Route path='/place/:code'><Place /></Route>
    </Switch>
  </Container>
);

export default App
