import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { LoadingSpinner } from './spinners'
import PlaceMap from './PlaceMap'
import Footer from './Footer'
import { formatInt, formatDec, formatPerc } from '../lib/formats'
import { compareString } from '../lib/utils'

const DemogTable = ({ header, values }) => {
  const applicableValues = values.filter(v => v.label !== 'Not applicable').sort((a, b) => b.value - a.value || compareString(a.label, b.label))
  const naValues = values.filter(v => v.label === 'Not applicable')
  const total = applicableValues.reduce((acc, cur) => acc + cur.value, 0)
  const displayValues = [...applicableValues, ...naValues].filter(v => v.value > 0)

  return (
    <>
      <h4>{header}</h4>
      <Table>
        <thead>
          <tr>
            <th />
            <th className='text-right'>People</th>
            <th className='text-right'>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {displayValues.map(v => (
            <tr key={v.label}>
              <td>{v.label}</td>
              <td className='text-right'>{formatInt(v.value)}</td>
              <td className='text-right'>{v.label === 'Not applicable' ? '' : formatPerc(v.value / total)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

const childNames = {
  Province: 'Districts',
  'District Municipality': 'Local Municipalities',
  'Metropolitan Municipality': 'Main Places',
  'Local Municipality': 'Main Places',
  'District Management Area': 'Main Places',
  'Main Place': 'Sub Places'
}

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
            ? <LoadingSpinner message='Data loading...' />
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

        <Col lg={6}>
          <div className='small-map' id='place-map' style={{ height: '300px' }}>
            {!loading && <PlaceMap place={place} />}
          </div>
          <div>
            <small>
              <Link to={`/place/${place.code}/map`}>View larger map</Link> •{' '}
              <a href={`/place/${place.code}/kml`}>Download KML file</a>
            </small>
          </div>
        </Col>
      </Row>

      {!loading && (
        <Row className='mt-3'>
          {place.population > 0 && (
            <Col lg={6}>
              {['Gender', 'Population group', 'First language'].map(name => {
                const data = place.demographics.find(d => d.name === name)
                return data && <DemogTable key={data.name} header={data.name} values={data.values} />
              })}
            </Col>
          )}

          {place.children.length > 0 && (
            <Col lg={6}>
              <h4>{childNames[place.type.descrip]}</h4>

              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className='text-right'>Population</th>
                    <th className='text-right'>Area (km²)</th>
                  </tr>
                </thead>
                <tbody>
                  {place.children.sort((a, b) => compareString(a.name.toUpperCase(), b.name.toUpperCase())).map(c => (
                    <tr key={c.code}>
                      <td><Link to={`/place/${c.code}`}>{c.name}</Link></td>
                      <td className='text-right'>{formatInt(c.population)}</td>
                      <td className='text-right'>{formatDec(c.area)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
        <Footer />
      </>
    )
  }
}

export default PlaceView
