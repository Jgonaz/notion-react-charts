import { useState } from 'react'
// import { getCategorias, getGastos, getIngresos } from './services/api.js'
import './styles/styles.scss'
import databaseIcon from './assets/icons/database-icon.svg'
import Charts from './components/Charts.jsx'

function App () {
  const [data, setData] = useState(undefined)

  const downloadData = () => {
    console.log('Descargando datos...')
    setData(true) // Prueba
  }

  return (
    <>
      <div className='flex-center flex-column'>
        <img src={databaseIcon} alt='Database icon' width={320} height={320} />
        <div>
          {data ? (
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
