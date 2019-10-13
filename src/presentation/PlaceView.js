import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { LoadingSpinner } from './spinners'
import { formatInt, formatDec } from '../lib/formats'

const PlaceInfo = ({ place }) => {
  return (
    <>
      <Breadcrumb>
        <LinkContainer to='/'><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
        {place.fullParents.map(p => <LinkContainer key={p.code} to={`/place/${p.code}`}><Breadcrumb.Item>{p.name}</Breadcrumb.Item></LinkContainer>)}
        <Breadcrumb.Item active>{place.name}</Breadcrumb.Item>
      </Breadcrumb>
      
      <Row>
        <Col lg={6}>
          <h2>
            {place.name}{' '}
            <small className='text-muted'>{place.type.descrip} {place.code} from Census 2011</small>
          </h2>

          <dl>
            <dt>Area</dt>
            <dd>{formatDec(place.area)} km²</dd>
            <dt>Population</dt>
            <dd>{formatInt(place.population)} ({formatDec(place.population/place.area)} per km²)</dd>
            <dt>Households</dt>
            <dd>{formatInt(place.households)} ({formatDec(place.households/place.area)} per km²)</dd>
          </dl>
        </Col>

        <Col lg={6}>
          <div className='small-map' id='place-map' style={{ height: '300px' }}>
            ...map goes here...
          </div>
          <div>
            <small>
              <Link to={`/place/${place.code}/map`}>View larger map</Link> •{' '}
              <a href={`/place/${place.code}/kml`}>Download KML file</a>
            </small>
          </div>
        </Col>
      </Row>

      <pre>{JSON.stringify(place, null, 2)}</pre>
    </>
  )
}

const PlaceView = ({ place }) => {
  return (
    <>
      <Helmet>
        <title>{place ? `Census 2011: ${place.type.descrip}: ${place.name}` : 'Census 2011'}</title>
      </Helmet>
      {place ? <PlaceInfo place={place} /> : <LoadingSpinner />}
    </>
  )

}

export default PlaceView
