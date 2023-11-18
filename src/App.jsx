import { useState } from 'react'
import { getNotionData } from './services/api.js'
import './styles/styles.scss'
import databaseIcon from './assets/icons/database-icon.svg'
import Charts from './components/Charts.jsx'
import Loading from './components/Loading.jsx'

const CATEGORIAS_ID = import.meta.env.VITE_NOTION_CATEGORIAS_ID
const MESES_ID = import.meta.env.VITE_NOTION_MESES_ID
const INGRESOS_ID = import.meta.env.VITE_NOTION_INGRESOS_ID
const GASTOS_ID = import.meta.env.VITE_NOTION_GASTOS_ID

function App () {
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const downloadData = () => {
    setLoading(true)
    Promise.all([
      // getNotionData(CATEGORIAS_ID, 'Categorias'),
      getNotionData(MESES_ID, 'Meses'),
      // getNotionData(INGRESOS_ID, 'Ingresos'),
      getNotionData(GASTOS_ID, 'Gastos')
    ]).then(response => {
      const [
        // categorias,
        // ingresos,
        gastos,
        meses
      ] = response
      const data = {
        // categorias,
        meses,
        // ingresos,
        gastos
      }
      console.log(data)
      setData(data)
      setLoading(false)
    })
  }

  return (
    <>
      <div className='flex-center flex-column'>
        <img src={databaseIcon} alt='Database icon' width={320} height={320} />
        <div>
          {loading ? (
            <Loading />
          ) : data ? (
            <Charts data={data} />
          ) : (
            <div className='flex-center flex-column'>
              <button className='main-btn' type='button' onClick={downloadData}>
                <span>Descargar datos</span>
              </button>
              <p>Pulsa descargar para mostrar la gráfica.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
