import React from 'react'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css'

import HomeContainer from './containers/HomeContainer'
import PlaceContainer from './containers/PlaceContainer'
import BigmapContainer from './containers/BigmapContainer'
import SearchContainer from './containers/SearchContainer'
import ErrorBoundary from './containers/ErrorBoundary'
import Layout from './presentation/Layout'

const App = () => {
  return (
    <Layout>
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<HomeContainer />} />
          <Route path='/place/:code/map' element={<BigmapContainer />} />
          <Route path='/place/:code' element={<PlaceContainer />} />
          <Route path='/search/:name' element={<SearchContainer />} />
        </Routes>
      </ErrorBoundary>
    </Layout>
  )
}

export default App
