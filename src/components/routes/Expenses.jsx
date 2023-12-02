import { useContext } from 'react'
import { NotionDataContext } from '@src/contexts/NotionDataContext.jsx'
import PieChart from '../expenses/PieChart.jsx'
import Loading from '../Loading.jsx'

function Expenses () {
  const { state } = useContext(NotionDataContext)

  function NoData () {
    return <h1>No hay datos para mostrar</h1>
  }

  return (
    <div className='main-container flex-center flex-column'>
      {state.loading && <Loading />}
      {!state.loading && !state.notionData && <NoData />}
      {!state.loading && state.notionData && <PieChart />}
    </div>
  )
}

export default Expenses
