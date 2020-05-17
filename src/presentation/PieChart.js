import React from 'react'
import { PieChart as Chart, Pie, Cell } from 'recharts'
import colors from '../lib/colors'

const CustomizedLabel = ({
  label, cx, cy, midAngle, innerRadius, outerRadius, percent, index
}) => {
  const left = (midAngle >= 90 && midAngle < 270)
  return (percent >= 0.03) ? (
    <text
      x={left ? cx - outerRadius + 10 : cx + outerRadius - 10}
      y={cy}
      fill='black'
      textAnchor={left ? 'start' : 'end'}
      dominantBaseline='central'
      transform={`rotate(${left ? 180 - midAngle : -midAngle}, ${cx}, ${cy})`}
    >
      {left ? (`${label} ${(percent * 100).toFixed(0)}%`) : (`${(percent * 100).toFixed(0)}% ${label}`)}
    </text>
  ) : null
}

const PieChart = ({ data }) => {
  return (
    <Chart isAnimationActive={false} width={450} height={350}>
      <Pie isAnimationActive={false} data={data} dataKey='value' nameKey='label' label={<CustomizedLabel />} labelLine={false} cx='50%' cy='50%' outerRadius={150}>
        {data.map(({ value, label }, index) => <Cell key={`cell-${label}`} fill={colors[label] || '#d9d9d9'} />)}
      </Pie>
    </Chart>
  )
}

export default PieChart
