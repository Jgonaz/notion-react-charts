import PropTypes from 'prop-types'
import { createContext, useState } from 'react'
import { getNotionData } from '../services/api.js'
import {
  mapCategorias,
  mapMeses,
  mapGastos,
  groupByCategories
} from '../utils/dataMapping.js'

// Crear el Contexto
const NotionDataContext = createContext()

// Crear el Proveedor del Contexto
const NotionDataProvider = ({ children }) => {
  // Creamos los estados
  const [notionData, setNotionData] = useState(undefined)
  const [pieChartData, setPieChartData] = useState([])
  const [monthFilter, setMonthFilter] = useState('')
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

      setLoading(false)
      setNotionData(data)
      const pieChartData = groupByCategories(data.gastos)
      setPieChartData(pieChartData)
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
        pieChartData,
        setPieChartData,
        loading,
        monthFilter,
        setMonthFilter,
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
