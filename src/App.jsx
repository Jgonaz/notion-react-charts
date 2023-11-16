import { useState } from 'react'
import { getNotionData } from './services/api.js'
import './styles/styles.scss'
import databaseIcon from './assets/icons/database-icon.svg'
import Charts from './components/Charts.jsx'
import Loading from './components/Loading.jsx'

function App () {
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const downloadData = () => {
    setLoading(true)
    Promise.all([getNotionData('get-gastos')]).then(response => {
      const [
        // categorias,
        gastos
        // ingresos
      ] = response
      const data = {
        // categorias,
        gastos
        // ingresos
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
