import { useContext } from 'react'
import Loading from '../Loading.jsx'
import { NotionDataContext } from '@src/contexts/NotionDataContext.jsx'
import HorizontalBarChart from '../difference/HorizontalBarChart.jsx'

function Difference () {
  const { state } = useContext(NotionDataContext)

  if (state.loading) {
    return <Loading />
  }

  if (!state.loading && !state.notionData) {
    return <h1>No hay datos para mostrar.</h1>
  }

  return (
    <div className='main-container flex-center flex-column'>
      <HorizontalBarChart />
    </div>
  )
}

export default Difference
