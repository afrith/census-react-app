import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomeContainer from './containers/HomeContainer'
import PlaceContainer from './containers/PlaceContainer'
import './App.css'
import Layout from './presentation/Layout'

const App = () => (
  <Layout>
    <Switch>
      <Route exact path='/'><HomeContainer /></Route>
      <Route path='/place/:code'><PlaceContainer /></Route>
    </Switch>
  </Layout>
);

export default App
