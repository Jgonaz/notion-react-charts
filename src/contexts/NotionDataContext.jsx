import PropTypes from 'prop-types'
import { createContext, useReducer, useEffect } from 'react'
import { getNotionData } from '../services/api.js'
import {
  mapCategorias,
  mapMeses,
  mapGastos,
  groupCategories
} from '../utils/dataMapping.js'

const initialState = {
  notionData: undefined,
  pieChartData: [],
  monthFilter: 'Todos los meses', // Filtramos por cadena
  loading: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTION_DATA':
      return { ...state, notionData: action.payload }
    case 'SET_PIE_CHART_DATA':
      return { ...state, pieChartData: action.payload }
    case 'SET_MONTH_FILTER':
      return { ...state, monthFilter: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

// Crear el Contexto
const NotionDataContext = createContext()

// Crear el Proveedor del Contexto
const NotionDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Descarga y mapea los datos de Notion.
  const downloadData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      // Trae los datos de las bases de datos.
      const [categorias, meses, gastos, ingresos] = await Promise.all([
        getNotionData(import.meta.env.VITE_NOTION_CATEGORIAS_ID, 'Categorias'),
        getNotionData(import.meta.env.VITE_NOTION_MESES_ID, 'Meses'),
        getNotionData(import.meta.env.VITE_NOTION_GASTOS_ID, 'Gastos'),
        getNotionData(import.meta.env.VITE_NOTION_INGRESOS_ID, 'Ingresos')
      ])

      // Mapea los datos.
      const data = {
        categorias: mapCategorias(categorias),
        meses: mapMeses(meses),
        gastos: mapGastos(gastos, mapCategorias(categorias), mapMeses(meses)),
        ingresos
      }

      dispatch({ type: 'SET_LOADING', payload: false })
      dispatch({ type: 'SET_NOTION_DATA', payload: data })
      dispatch({
        type: 'SET_PIE_CHART_DATA',
        payload: groupCategories(data.gastos)
      })
    } catch (error) {
      console.error('Error:', error)
      dispatch({ type: 'SET_LOADING', payload: false })
      dispatch({ type: 'SET_PIE_CHART_DATA', payload: undefined })
    }
  }

  useEffect(() => {
    downloadData()
  }, [])

  return (
    <NotionDataContext.Provider value={{ state, dispatch }}>
      {children}
    </NotionDataContext.Provider>
  )
}

NotionDataProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { NotionDataProvider, NotionDataContext }
