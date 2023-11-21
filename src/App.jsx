import './styles/styles.scss'

import { useContext } from 'react'
import { NotionDataContext } from './contexts/NotionDataContext.jsx'

import Charts from './components/PieChart.jsx'
import Loading from './components/Loading.jsx'
import { groupByCategories } from './utils/dataMapping.js'
import databaseIcon from './assets/icons/database-icon.svg'

function App () {
  // Usa el hook useContext para acceder al contexto
  const { loading, notionData, downloadData, dateInformation, totalAmount } = useContext(NotionDataContext)

  return (
    <>
      <div className='flex-center flex-column'>
        <div>
          {loading && <Loading />}
          {!loading && (
            <>
              {!notionData && (
                <div>
                  <img src={databaseIcon} alt='Database icon' width={320} height={320} />
                  <div className='flex-center flex-column'>
                    <button className='main-btn' type='button' onClick={downloadData}>
                      <span>Descargar datos</span>
                    </button>
                    <p>Pulsa descargar para mostrar la gráfica.</p>
                  </div>
                </div>
              )}
              {notionData && (
                <div className='flex-center flex-column'>
                  <p>
                    Gasto total desde el {dateInformation.firstDay} al {dateInformation.lastDay} (
                    {dateInformation.totalDays} días): {totalAmount}
                  </p>
                  <Charts data={groupByCategories(notionData.gastos)} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default App
