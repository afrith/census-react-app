import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { LoadingSpinner } from './spinners'

const HomeView = ({ loading, provinces }) => {
  return (
    <>
      <Helmet><title>Census 2011</title></Helmet>
      {(!loading && provinces)
        ? (
          <ul>
            {provinces.map(({ code, name }) => (
              <li key={code}>
                <Link to={`/place/${code}`}>{name}</Link>
              </li>
            ))}
          </ul>
        )
        : <LoadingSpinner />}
    </>
  )
}

export default HomeView
