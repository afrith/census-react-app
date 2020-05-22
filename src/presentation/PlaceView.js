import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { keyBy } from 'lodash'
import { LoadingSpinner } from './spinners'
import PlaceMap from './PlaceMap'
import { PieBlock, AgeBlock } from './DemogBlocks'
import ChildrenTable from './ChildrenTable'
import { formatInt, formatDec } from '../lib/formats'

const PlaceInfo = ({ place, map, loading }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [place.code])

  let keyedVariables
  if (place.variables) {
    keyedVariables = keyBy(place.variables, d => d.variable.name)
  }

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
            <small className='text-muted'>{place.type.descrip} {place.code} from Census 2001</small>
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
              <PieBlock header='Gender' values={keyedVariables.Gender.values} />
              <AgeBlock header='Age' values={keyedVariables.Age.values} />
              <PieBlock header='Population group' values={keyedVariables['Population group'].values} />
              <PieBlock header='First language' values={keyedVariables['First language'].values} />
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
        <Helmet><title>Census 2001</title></Helmet>
        <LoadingSpinner />
      </>
    )
  } else {
    return (
      <>
        <Helmet><title>{`Census 2001: ${place.type.descrip}: ${place.name}`}</title></Helmet>
        <PlaceInfo place={place} loading={loading} />
      </>
    )
  }
}

export default PlaceView
