import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { LoadingSpinner } from './spinners'
import PlaceMap from './PlaceMap'
import { PieBlock, AgeBlock } from './DemogBlocks'
import ChildrenTable from './ChildrenTable'
import { formatInt, formatDec } from '../lib/formats'

const PlaceInfo = ({ place, map, loading }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [place.code])

  return (
    <>
      <Breadcrumb>
        <LinkContainer to='/'><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
        {!loading && place.fullParents.map(p => <LinkContainer key={p.code} to={`/place/${p.code}`}><Breadcrumb.Item>{p.name}</Breadcrumb.Item></LinkContainer>)}
        <Breadcrumb.Item active>{place.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col lg={6}>
          <h2>
            {place.name}<br />
            <small className='text-muted'>{place.type.descrip} {place.code} from Census 2011</small>
          </h2>

          {loading
            ? <LoadingSpinner />
            : (
              <dl>
                <dt>Area</dt>
                <dd>{formatDec(place.area)} km²</dd>
                <dt>Population</dt>
                <dd>{formatInt(place.population)} ({formatDec(place.population / place.area)} per km²)</dd>
                <dt>Households</dt>
                <dd>{formatInt(place.households)} ({formatDec(place.households / place.area)} per km²)</dd>
              </dl>
            )}
        </Col>

        {!loading && (
          <Col lg={6}>
            <div className='small-map' id='place-map' style={{ height: '300px' }}>
              <PlaceMap place={place} />
            </div>
            <div>
              <small>
                <Link to={`/place/${place.code}/map`}>View larger map</Link> •{' '}
                <a href={`/place/${place.code}/kml`}>Download KML file</a>
              </small>
            </div>
          </Col>
        )}
      </Row>

      {!loading && (
        <Row className='mt-3'>
          {place.population > 0 && (
            <Col lg={6}>
              {['Gender', 'Population group', 'First language'].map(name => {
                const data = place.variables.find(d => d.variable.name === name)
                return data && <PieBlock key={data.variable.name} header={data.variable.name} values={data.values} />
              })}
              <AgeBlock header='Age' values={place.variables.find(d => d.variable.name === 'Age').values} />
            </Col>
          )}

          {place.children.length > 0 && (
            <Col lg={6}>
              <ChildrenTable place={place} />
            </Col>
          )}
        </Row>
      )}
    </>
  )
}

const PlaceView = ({ place, loading, geom, childGeoms, geomLoading }) => {
  if (!place.code) {
    return (
      <>
        <Helmet><title>Census 2011</title></Helmet>
        <LoadingSpinner />
      </>
    )
  } else {
    return (
      <>
        <Helmet><title>{`Census 2011: ${place.type.descrip}: ${place.name}`}</title></Helmet>
        <PlaceInfo place={place} loading={loading} />
      </>
    )
  }
}

export default PlaceView
