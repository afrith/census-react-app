import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Table from 'react-bootstrap/Table'
import { LoadingSpinner } from './spinners'
import { formatInt, formatDec } from '../lib/formats'
import SearchForm from './SearchForm'

const ResultTable = ({ places }) => {
  return (
    <Table className='mt-4'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type of place</th>
          <th>Province</th>
          <th className='text-right'>Population</th>
          <th className='text-right'>Area (km²)</th>
        </tr>
      </thead>
      <tbody>
        {places.map(p => (
          <tr key={p.code}>
            <td><Link to={`/place/${p.code}`}>{p.name}</Link></td>
            <td>{p.type.descrip}</td>
            <td>{p.province.name}</td>
            <td className='text-right'>{formatInt(p.population)}</td>
            <td className='text-right'>{formatDec(p.area)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const SearchView = ({ name, loading, places }) => {
  return (
    <>
      <Helmet><title>Census 2011: Search Results: “{name}”</title></Helmet>
      
      <Breadcrumb>
        <LinkContainer to='/'><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
        <Breadcrumb.Item active aria-current='page'>Search for “{name}”</Breadcrumb.Item>
      </Breadcrumb>

      <h2>Census 2011 Search Results for “{name}”</h2>

      {(!loading && places) ? <ResultTable places={places} /> : <LoadingSpinner />}

      <h2>Search again</h2>

      <SearchForm defaultSearchText={name} />
    </>
  )
}

export default SearchView
