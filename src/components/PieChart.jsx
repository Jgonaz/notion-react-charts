import { useContext } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { chartColors, chartBorderColors } from '../constants/chartColors.js'
import { NotionDataContext } from '../contexts/NotionDataContext.jsx'
import MonthSelector from './MonthSelector.jsx'
import { formatCurrency } from '../utils/utils.js'

ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.register(ChartDataLabels)

export default function PieChart () {
  const { state } = useContext(NotionDataContext)

  const data = {
    labels: state.pieChartData.map(item => item.Categoría),
    datasets: [
      {
        label: '(€)',
        data: state.pieChartData.map(item => item.Cantidad),
        backgroundColor: chartColors,
        borderColor: chartBorderColors,
        borderWidth: 1
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 15
        }
      },
      datalabels: {
        display: context =>
          (context.dataset.data[context.dataIndex] /
            state.pieChartData.reduce((acc, item) => acc + item.Cantidad, 0)) *
            100 >
          10, // Solo mostrará el porcentaje si es mayor al 10%.
        formatter: (value, context) => {
          const label = data.labels[context.dataIndex]
          const porcentaje = (
            (value /
              state.pieChartData.reduce(
                (acc, item) => acc + item.Cantidad,
                0
              )) *
            100
          ).toFixed(2) // Redondear a dos decimales
          return `${label.split(' ')[0]}: ${formatCurrency(
            value
          )} (${porcentaje}%)`
        },
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 3,
        padding: 5,
        font: {
          weight: 'bold'
        }
      }
    }
  }
  return (
    <div className='flex-center flex-column'>
      <div
        className='flex-center'
        style={{ gap: '15px', marginBottom: '15px' }}
      >
        <span>
          Total:{' '}
          {formatCurrency(
            state.pieChartData.reduce((acc, item) => acc + item.Cantidad, 0)
          )}
        </span>
        <MonthSelector />
      </div>
      <Pie
        data={data}
        width={800}
        height={800}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  )
}
