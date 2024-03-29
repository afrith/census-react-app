import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { LoadingSpinner } from './spinners'
import SearchForm from './SearchForm'
import { formatInt } from '../lib/formats'
import { compareString } from '../lib/utils'

const ProvinceTable = ({ provinces }) => {
  const sortedProvinces = [...provinces].sort((a, b) => compareString(a.name.toUpperCase(), b.name.toUpperCase()))
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th className='text-right'>Population</th>
          <th className='text-right'>Area (km²)</th>
        </tr>
      </thead>
      <tbody>
        {sortedProvinces.map(({ code, name, population, area }) => (
          <tr key={code}>
            <td><Link to={`/place/${code}`}>{name}</Link></td>
            <td className='text-right'>{formatInt(population)}</td>
            <td className='text-right'>{formatInt(area)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const HomeView = ({ loading, provinces }) => {
  return (
    <>
      <Helmet><title>Census 2011</title></Helmet>

      <h1>Census 2011</h1>

      <p>This site provides online access to a selection of results from South Africa's <a href='http://www.statssa.gov.za/?page_id=3839'>Census 2011</a> down to the “small area” layer of detail, as released in the Community Profile Database DVD set. Please note the <a href='#footer'>disclaimer</a> at the foot of this page.</p>

      <Row>
        <Col lg={6}>
          <h2>Search</h2>

          <SearchForm />

          <h2>Navigate</h2>

          <p>You can select one of the provinces below and then navigate further down the hierarchy of places.</p>

          {(!loading && provinces) ? <ProvinceTable provinces={provinces} /> : <LoadingSpinner />}
        </Col>

        <Col lg={6}>
          <h2>Place types</h2>

          <p>The census results are available for six types of area, which are listed here from largest to smallest.</p>
          <dl>
            <dt>Provinces</dt>
            <dd>The nine provinces of South Africa.</dd>
            <dt>Metropolitan and District Municipalities</dt>
            <dd>Administrative divisions of the provinces; there are 8 metropolitan and 44 district municipalities.</dd>
            <dt>Local Municipalities</dt>
            <dd>Administrative divisions of the district municipalities; there are 226 local municipalities.</dd>
            <dt>Main Places</dt>
            <dd>Named locations determined by Stats SA, which generally correspond to towns, small cities, regions of large cities, or traditional council areas. Areas that do not fall within any named settlement are incorporated in a main place named for the municipality.</dd>
            <dt>Sub Places</dt>
            <dd>Named locations determined by Stats SA, which generally correspond to suburbs, villages, or localities. When a main place contains only one sub place, that sub place is named for the main place with a suffix of “SP”.</dd>
            <dt>Small Areas</dt>
            <dd>The smallest output unit for census data; on average each small area contains approximately 600 people.</dd>
          </dl>
        </Col>
      </Row>
    </>
  )
}

export default HomeView
