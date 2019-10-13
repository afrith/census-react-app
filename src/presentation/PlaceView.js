import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { LoadingSpinner } from './spinners'
import { formatInt, formatDec, formatPerc } from '../lib/formats'

const DemogTable = ({ header, values }) => {
  const applicableValues = values.filter(v => v.label !== 'Not applicable').sort((a, b) => b.value - a.value)
  const naValues = values.filter(v => v.label === 'Not applicable')
  const total = applicableValues.reduce((acc, cur) => acc + cur.value, 0)
  const displayValues = [...applicableValues, ...naValues].filter(v => v.value > 0)

  return (
    <>
      <h4>{header}</h4>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th className='text-right'>People</th>
            <th className='text-right'>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {displayValues.map(v => (
            <tr key={v.label}>
              <td>{v.label}</td>
              <td className='text-right'>{formatInt(v.value)}</td>
              <td className='text-right'>{formatPerc(v.value / total)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

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

      <Row>
        {place.population > 0 && (
          <Col lg={6}>
            {['Gender', 'Population group', 'First language'].map(name => {
              const data = place.demographics.find(d => d.name === name)
              return data && <DemogTable header={data.name} values={data.values} />
            })}
          </Col>
        )}
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
