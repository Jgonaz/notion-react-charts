import { useContext } from 'react'
import { NotionDataContext } from '@src/contexts/NotionDataContext.jsx'
import PieChart from '../expenses/PieChart.jsx'
import Loading from '../Loading.jsx'

function Expenses () {
  const { state } = useContext(NotionDataContext)

  if (state.loading) {
    return <Loading />
  }

  if (!state.notionData) {
    return <h1>No hay datos para mostrar.</h1>
  }

  return (
    <div className='main-container flex-center flex-column'>
      <PieChart />
    </div>
  )
}

export default Expenses
