import './styles/styles.scss'
import { useContext } from 'react'
import { NotionDataContext } from './contexts/NotionDataContext.jsx'
import PieChart from './components/PieChart.jsx'
import Loading from './components/Loading.jsx'

function App () {
  const { loading, notionData, downloadData } = useContext(NotionDataContext)

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
      {loading && <Loading />}
      {!loading && !notionData && <Buttons />}
      {!loading && notionData && <PieChart />}
    </div>
  )
}

export default App
