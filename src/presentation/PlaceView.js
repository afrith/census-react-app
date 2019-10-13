import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { LoadingSpinner } from './spinners'

const PlaceView = ({ loading, place }) => {
  return (
    <>
      <Helmet>
        <title>{place ? `Census 2011: ${place.type.descrip}: ${place.name}` : 'Census 2011'}</title>
      </Helmet>
      {(!loading && place) 
        ? (
          <>
            <Link to='/'>Home</Link>
            <pre>{JSON.stringify(place, null, 2)}</pre>
          </>
        )
        : <LoadingSpinner />}
    </>
  )

}

export default PlaceView
