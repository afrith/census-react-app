import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { parse } from 'query-string'
import 'leaflet/dist/leaflet.css'
import './App.css'

import HomeContainer from './containers/HomeContainer'
import PlaceContainer from './containers/PlaceContainer'
import SearchContainer from './containers/SearchContainer'
import ErrorBoundary from './containers/ErrorBoundary'
import Layout from './presentation/Layout'

const App = () => (
  <Layout>
    <ErrorBoundary>
      <Switch>
        <Route exact path='/'><HomeContainer /></Route>
        <Route path='/place/:code'><PlaceContainer /></Route>
        <Route path='/search/:name'><SearchContainer /></Route>
        <Route
          path='/search'
          render={({ location }) => {
            const query = parse(location.search).q
            if (query) return <Redirect to={`/search/${encodeURIComponent(query.trim())}`} />
            else return <Redirect to='/' />
          }}
        />
      </Switch>
    </ErrorBoundary>
  </Layout>
)

export default App
