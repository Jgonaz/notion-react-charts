import { useContext } from 'react'
import { NotionDataContext } from '../../contexts/NotionDataContext.jsx'
import PieChart from '../../components/PieChart.jsx'
import Loading from '../../components/Loading.jsx'

function Expenses () {
  const { state } = useContext(NotionDataContext)

  function NoData () {
    return (
      <div className='flex-center flex-column'>
        <h1>No hay datos para mostrar</h1>
      </div>
    )
  }

  return (
    <div className='flex-center flex-column'>
      {state.loading && <Loading />}
      {!state.loading && !state.notionData && <NoData />}
      {!state.loading && state.notionData && <PieChart />}
    </div>
  )
}

export default Expenses
