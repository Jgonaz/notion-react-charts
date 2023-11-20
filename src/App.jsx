import { useState } from 'react'
import { getNotionData } from './services/api.js'
import './styles/styles.scss'
import databaseIcon from './assets/icons/database-icon.svg'
import Charts from './components/Charts.jsx'
import Loading from './components/Loading.jsx'
import { mapCategorias, mapMeses, mapGastos, groupByCategories } from './utils/dataMapping.js'
import { formatCurrency, obtenerInformacionFechas } from './utils/utils.js'

const CATEGORIAS_ID = import.meta.env.VITE_NOTION_CATEGORIAS_ID
const MESES_ID = import.meta.env.VITE_NOTION_MESES_ID
const INGRESOS_ID = import.meta.env.VITE_NOTION_INGRESOS_ID
const GASTOS_ID = import.meta.env.VITE_NOTION_GASTOS_ID

function App () {
  const [notionData, setNotionData] = useState(undefined)
  const [totalAmount, setTotalAmount] = useState(0)
  const [dateInformation, setDateInformation] = useState({})
  const [loading, setLoading] = useState(false)

  const downloadData = async () => {
    setLoading(true)
    try {
      const [categorias, meses, gastos, ingresos] = await Promise.all([
        getNotionData(CATEGORIAS_ID, 'Categorias'),
        getNotionData(MESES_ID, 'Meses'),
        getNotionData(GASTOS_ID, 'Gastos'),
        getNotionData(INGRESOS_ID, 'Ingresos')
      ])

      const data = {
        categorias: mapCategorias(categorias),
        meses: mapMeses(meses),
        gastos: mapGastos(gastos, mapCategorias(categorias), mapMeses(meses)),
        ingresos
      }

      setLoading(false)
      setNotionData(data)
      setDateInformation(obtenerInformacionFechas(data.gastos))
      setTotalAmount(prevTotal => formatCurrency(data.gastos.reduce((acc, item) => acc + item.Cantidad, 0)))
    } catch (error) {
      console.error('Error:', error)
      setNotionData(undefined)
      setLoading(false)
    }
  }

  return (
    <>
      <div className='flex-center flex-column'>
        <div>
          {loading && <Loading />}

          {!loading && !notionData && (
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

          {!loading && notionData && (
            <div className='flex-center flex-column'>
              <p>
                Gasto total desde el {dateInformation.firstDay} al {dateInformation.lastDay} (
                {dateInformation.totalDays} días): {totalAmount}
              </p>
              <Charts data={groupByCategories(notionData.gastos)} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
