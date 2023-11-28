import PropTypes from 'prop-types'
import { createContext, useReducer, useEffect } from 'react'
import { getNotionData } from '../services/api.js'
import {
  mapCategories,
  mapMonths,
  mapExpenses,
  groupCategories
} from '../utils/dataMapping.js'

const initialState = {
  notionData: [], // Datos de las tablas de Notion (todos los gastos, ingresos, categorías y meses)
  categoriesData: [], // Datos para el gráfico (categorías organizadas por total y -puede que por- mes)
  expensesData: [], // Datos para la modal (gastos desglosados por fecha, organizados por categoría y mes)
  expensesOrder: { property: 'Fecha', type: 'desc' }, // Orden de la modal (ascendente o descendente)
  monthFilter: 'Todos los meses', // Filtro para el gráfico
  loading: false // Cargando
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTION_DATA':
      return { ...state, notionData: action.payload }
    case 'SET_CATEGORIES_DATA':
      return { ...state, categoriesData: action.payload }
    case 'SET_EXPENSES_DATA':
      return { ...state, expensesData: action.payload }
    case 'SET_EXPENSES_ORDER':
      return { ...state, expensesOrder: action.payload }
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
      const [categories, months, expenses, income] = await Promise.all([
        getNotionData(import.meta.env.VITE_NOTION_CATEGORIAS_ID, 'Categorias'),
        getNotionData(import.meta.env.VITE_NOTION_MESES_ID, 'Meses'),
        getNotionData(import.meta.env.VITE_NOTION_GASTOS_ID, 'Gastos'),
        getNotionData(import.meta.env.VITE_NOTION_INGRESOS_ID, 'Ingresos')
      ])

      // Mapea los datos.
      const data = {
        categories: mapCategories(categories),
        months: mapMonths(months),
        expenses: mapExpenses(
          expenses,
          mapCategories(categories),
          mapMonths(months)
        ),
        income
      }

      dispatch({ type: 'SET_LOADING', payload: false })
      dispatch({ type: 'SET_NOTION_DATA', payload: data })
      dispatch({
        type: 'SET_CATEGORIES_DATA',
        payload: groupCategories(data.expenses)
      })
    } catch (error) {
      console.error('Error:', error)
      dispatch({ type: 'SET_LOADING', payload: false })
      dispatch({ type: 'SET_CATEGORIES_DATA', payload: [] })
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
