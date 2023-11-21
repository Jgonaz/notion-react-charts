import './styles/styles.scss'
import { useContext } from 'react'
import { NotionDataContext } from './contexts/NotionDataContext.jsx'
import Charts from './components/PieChart.jsx'
import Loading from './components/Loading.jsx'
import { groupByCategories } from './utils/dataMapping.js'

function App () {
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
                  <div className='flex-center flex-column'>
                    <button className='main-btn' type='button' onClick={downloadData}>
                      Mostrar gastos por meses
                    </button>
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
