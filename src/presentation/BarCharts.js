import React from 'react'
import { BarChart as Chart, Bar, XAxis } from 'recharts'

const CustomizedAxisTick = ({ x, y, stroke, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dy={0} textAnchor='end' dominantBaseline='central' fill='#black' transform='rotate(-90)'>{payload.value}</text>
  </g>
)

export const AgeChart = ({ data }) => {
  return (
    <Chart isAnimationActive={false} width={450} height={350} data={data}>
      <XAxis dataKey='label' interval={0} height={60} tick={<CustomizedAxisTick />} />
      <Bar dataKey='value' fill='#80b1d3' />
    </Chart>
  )
}
