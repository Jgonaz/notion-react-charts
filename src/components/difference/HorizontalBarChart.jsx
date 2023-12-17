import { useContext } from 'react'
import { NotionDataContext } from '@src/contexts/NotionDataContext.jsx'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { groupCategories, groupIncomes } from '@src/utils/dataMapping.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function HorizontalbarChart () {
  const { state } = useContext(NotionDataContext)

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: 'Diferencia de ingresos / gastos divididos por meses'
      }
    }
  }

  // Calculamos los gastos por cada mes
  const gastosPorMes = state.notionData?.months?.map(m => {
    return groupCategories(state.notionData?.expenses, m.value)
      .reduce((total, categoria) => total + categoria.Cantidad, 0)
      .toFixed(2)
  })

  const ingresosPorMes = groupIncomes(
    state.notionData?.income,
    state.notionData?.months
  )

  const data = {
    labels: state.notionData?.months?.map(m => m.value),
    datasets: [
      {
        label: 'Gastos (€)',
        data: gastosPorMes,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Ingresos (€)',
        data: ingresosPorMes,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  }

  return <Bar options={options} data={data} />
}

export default HorizontalbarChart
