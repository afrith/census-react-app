import React from 'react'
import Table from 'react-bootstrap/Table'
import { formatInt, formatPerc } from '../lib/formats'
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

export default DemogTable
