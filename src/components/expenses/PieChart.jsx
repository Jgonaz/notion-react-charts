import { useContext } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { NotionDataContext } from '@src/contexts/NotionDataContext.jsx'
import MonthSelector from './MonthSelector.jsx'
import { formatCurrency } from '@src/utils/utils.js'
import CategoriesList from './CategoriesList.jsx'

ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.register(ChartDataLabels)

export default function PieChart () {
  const { state } = useContext(NotionDataContext)

  const data = {
    labels: state.categoriesData.map(item => item.Categoría),
    datasets: [
      {
        label: '(€)',
        data: state.categoriesData.map(item => item.Cantidad),
        backgroundColor: state.categoriesData.map(item => item.Color),
        borderColor: state.categoriesData.map(item => item.BorderColor),
        borderWidth: 1
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        display: false,
        formatter: (value, context) => {
          const label = data.labels[context.dataIndex]
          const porcentaje = (
            (value /
              state.categoriesData.reduce(
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
    <div className='flex-center'>
      <div>
        <div className='flex-center' style={{ marginTop: '15px' }}>
          <MonthSelector />
        </div>
        <div style={{ width: '600px', height: '600px', padding: '15px' }}>
          <Pie data={data} options={options} plugins={[ChartDataLabels]} />
        </div>
      </div>
      <CategoriesList />
    </div>
  )
}
