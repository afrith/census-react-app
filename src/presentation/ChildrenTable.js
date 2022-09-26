import React from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { formatInt, formatDec } from '../lib/formats'
import { compareString } from '../lib/utils'

const childNames = {
  province: 'Districts',
  district: 'Local Municipalities',
  metro: 'Main Places',
  local: 'Main Places',
  dma: 'Main Places',
  mainplace: 'Sub Places',
  subplace: 'Small Areas'
}

const ChildrenTable = ({ place }) => {
  const sortedChildren = [...place.children].sort((a, b) => compareString(a.name.toUpperCase(), b.name.toUpperCase()))
  return (
    <>
      <h4>{childNames[place.type.name]}</h4>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th className='text-right'>Population</th>
            <th className='text-right'>Area (km²)</th>
          </tr>
        </thead>
        <tbody>
          {sortedChildren.map(c => (
            <tr key={c.code}>
              <td><Link to={`/place/${c.code}`}>{c.name}</Link></td>
              <td className='text-right'>{formatInt(c.population)}</td>
              <td className='text-right'>{formatDec(c.area)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default ChildrenTable
