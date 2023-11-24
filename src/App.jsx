import './styles/styles.scss'
import { useContext } from 'react'
import { NotionDataContext } from './contexts/NotionDataContext.jsx'
import PieChart from './components/PieChart.jsx'
import Loading from './components/Loading.jsx'

function App () {
  const { state, downloadData } = useContext(NotionDataContext)

  function Buttons () {
    return (
      <div className='flex-center flex-column'>
        <button className='main-btn' type='button' onClick={downloadData}>
          Mostrar gastos por meses
        </button>
      </div>
    )
  }

  return (
    <div className='flex-center flex-column'>
      {state.loading && <Loading />}
      {!state.loading && !state.notionData && <Buttons />}
      {!state.loading && state.notionData && <PieChart />}
    </div>
  )
}

export default App
