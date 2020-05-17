import React from 'react'
import Table from 'react-bootstrap/Table'
import { formatInt, formatPerc } from '../lib/formats'

const BasicTable = ({ values, total }) => (
  <Table>
    <thead>
      <tr>
        <th />
        <th className='text-right'>People</th>
        <th className='text-right'>Percentage</th>
      </tr>
    </thead>
    <tbody>
      {values.map(v => (
        <tr key={v.label}>
          <td>{v.label}</td>
          <td className='text-right'>{formatInt(v.value)}</td>
          <td className='text-right'>{v.label === 'Not applicable' ? '' : formatPerc(v.value / total)}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)

export default BasicTable
