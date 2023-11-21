import PropTypes from 'prop-types'
import { createContext, useState } from 'react'
import { getNotionData } from '../services/api.js'
import { mapCategorias, mapMeses, mapGastos } from '../utils/dataMapping.js'
import { formatCurrency, obtenerInformacionFechas } from '../utils/utils.js'

// Crear el Contexto
const NotionDataContext = createContext()

// Crear el Proveedor del Contexto
const NotionDataProvider = ({ children }) => {
  // Creamos los estados
  const [notionData, setNotionData] = useState(undefined)
  const [totalAmount, setTotalAmount] = useState(0)
  const [dateInformation, setDateInformation] = useState({})
  const [loading, setLoading] = useState(false)

  // Descarga y mapea los datos de Notion.
  const downloadData = async () => {
    setLoading(true)
    try {
      // Trae los datos de las bases de datos.
      const [categorias, meses, gastos, ingresos] = await Promise.all([
        getNotionData(import.meta.env.VITE_NOTION_CATEGORIAS_ID, 'Categorias'),
        getNotionData(import.meta.env.VITE_NOTION_MESES_ID, 'Meses'),
        getNotionData(import.meta.env.VITE_NOTION_GASTOS_ID, 'Gastos'),
        getNotionData(import.meta.env.VITE_NOTION_INGRESOS_ID, 'Ingresos')
      ])

      console.log('Data:', [categorias, meses, gastos, ingresos])

      // Mapea los datos.
      const data = {
        categorias: mapCategorias(categorias),
        meses: mapMeses(meses),
        gastos: mapGastos(gastos, mapCategorias(categorias), mapMeses(meses)),
        ingresos
      }

      // Settea los estados.
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
    <NotionDataContext.Provider
      value={{
        notionData,
        totalAmount,
        dateInformation,
        loading,
        downloadData
      }}
    >
      {children}
    </NotionDataContext.Provider>
  )
}

NotionDataProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { NotionDataProvider, NotionDataContext }
