import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { chartColors, chartBorderColors } from '../constants/chartColors.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Chart (chartData) {
  const data = {
    labels: chartData.data.map(item => item.Categoría),
    datasets: [
      {
        label: 'Total euros (€)',
        data: chartData.data.map(item => item.Cantidad),
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
  return <Pie data={data} width={800} height={800} options={options} />
}
