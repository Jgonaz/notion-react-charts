import { useContext } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { chartColors, chartBorderColors } from '../constants/chartColors.js'
import { NotionDataContext } from '../contexts/NotionDataContext.jsx'
import MonthSelector from './MonthSelector.jsx'
import { formatCurrency } from '../utils/utils.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart () {
  const { pieChartData } = useContext(NotionDataContext)

  const data = {
    labels: pieChartData.map(item => item.Categoría),
    datasets: [
      {
        label: 'Total euros (€)',
        data: pieChartData.map(item => item.Cantidad),
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
            pieChartData.reduce((acc, item) => acc + item.Cantidad, 0)
          )}
        </span>
        <MonthSelector />
      </div>
      <Pie data={data} width={800} height={800} options={options} />
    </div>
  )
}
