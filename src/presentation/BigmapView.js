import React from 'react'
import { Helmet } from 'react-helmet-async'
import { LinkContainer } from 'react-router-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { LoadingSpinner } from './spinners'
import PlaceMap from './PlaceMap'
import Footer from './Footer'

const BigmapView = ({ loading, place }) => {
  if (loading || !place) {
    return (
      <>
        <Helmet><title>Census 2011</title></Helmet>
        <LoadingSpinner />
      </>
    )
  } else {
    return (
      <>
        <Helmet><title>{`Census 2011: ${place.type.descrip}: ${place.name}: Map`}</title></Helmet>
        <Breadcrumb>
          <LinkContainer to='/'><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
          {place.fullParents.map(p => <LinkContainer key={p.code} to={`/place/${p.code}`}><Breadcrumb.Item>{p.name}</Breadcrumb.Item></LinkContainer>)}
          <LinkContainer to={`/place/${place.code}`}><Breadcrumb.Item>{place.name}</Breadcrumb.Item></LinkContainer>
          <Breadcrumb.Item active>Map</Breadcrumb.Item>
        </Breadcrumb>
        <h3>Map of {place.name} {place.type.descrip}</h3>
        <PlaceMap place={place} />
        <Footer />
      </>
    )
  }
}

export default BigmapView
