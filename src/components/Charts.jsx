import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import PropTypes from 'prop-types' // Importa PropTypes

// Espera recibir una propiedad llamada data que debe ser un array,
Charts.propTypes = {
  data: PropTypes.array.isRequired
}

export default function Charts ({ data }) {
  const COLORS = [
    '#8884d8',
    '#83a6ed',
    '#8dd1e1',
    '#82ca9d',
    '#a4de6c',
    '#d0ed57',
    '#ffc658',
    '#fa8c16',
    '#d4380d',
    '#ad2102',
    '#722ed1',
    '#eb2f96',
    '#fadb14'
  ]

  return (
    <PieChart width={400} height={800}>
      <Pie
        data={data}
        dataKey='Cantidad'
        nameKey='Categoría'
        cx='50%'
        cy='50%'
        outerRadius={200}
        fill='#8884d8'
        label
        colors={COLORS}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}
