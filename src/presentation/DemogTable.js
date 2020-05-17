import React from 'react'
import Table from 'react-bootstrap/Table'

import PieChart from './PieChart'
import { AgeChart } from './BarCharts'
import TableCollapse from './TableCollapse'
import { formatInt, formatPerc } from '../lib/formats'
import { compareString } from '../lib/utils'

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

const DemogTable = ({ header, values }) => {
  const applicableValues = values.filter(v => v.label !== 'Not applicable').sort((a, b) => b.value - a.value || compareString(a.label, b.label))
  const naValues = values.filter(v => v.label === 'Not applicable')
  const total = applicableValues.reduce((acc, cur) => acc + cur.value, 0)
  const displayValues = [...applicableValues, ...naValues].filter(v => v.value > 0)

  return (
    <div className='pb-3'>
      <h4>{header}</h4>
      <div className='d-flex flex-column align-items-center'>
        <PieChart data={applicableValues} />
        {(naValues.length > 0 && naValues[0].value > 0) && (
          <div className='font-italic mb-3'>{formatInt(naValues[0].value)}  "Not applicable" records not included.</div>
        )}
      </div>
      <TableCollapse keyForId={header}>
        <BasicTable header={header} values={displayValues} total={total} />
      </TableCollapse>
    </div>
  )
}

const AGE_MAX = 85
const ageIndex = age => Math.min(AGE_MAX / 5, Math.floor(age / 5))

export const AgeTable = ({ header, values }) => {
  const total = values.reduce((acc, cur) => acc + cur.value, 0)

  const cats = new Array(AGE_MAX / 5 + 1)
  for (const val of values) {
    const idx = ageIndex(parseInt(val.label))
    cats[idx] = (cats[idx] || 0) + val.value
  }

  const catValues = cats.map((value, idx) => ({
    label: idx === (AGE_MAX / 5) ? '85+' : `${idx * 5}–${idx * 5 + 4}`,
    value
  }))

  return (
    <div className='pb-3'>
      <h4>{header}</h4>
      <div className='d-flex flex-column align-items-center'>
        <AgeChart data={catValues} />
      </div>
      <TableCollapse keyForId={header}>
        <BasicTable header={header} values={catValues} total={total} />
      </TableCollapse>
    </div>
  )
}

export default DemogTable
