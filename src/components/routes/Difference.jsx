import { useContext } from 'react'
import Loading from '../Loading.jsx'
import { NotionDataContext } from '@src/contexts/NotionDataContext.jsx'
import HorizontalBarChart from '../difference/HorizontalBarChart.jsx'

function Difference () {
  const { state } = useContext(NotionDataContext)

  function NoData () {
    return <h1>No hay datos para mostrar</h1>
  }

  return (
    <div className='main-container flex-center flex-column'>
      {state.loading && <Loading />}
      {!state.loading && !state.notionData && <NoData />}
      {!state.loading && state.notionData && <HorizontalBarChart />}
    </div>
  )
}

export default Difference
