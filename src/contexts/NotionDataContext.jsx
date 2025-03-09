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

// Descarga y mapea los datos de Notion.
const fetchData = async () => {
  try {
    if (import.meta.env.VITE_NOTION_API_KEY) {
      return await Promise.all([
        getNotionData(import.meta.env.VITE_NOTION_CATEGORIAS_ID, 'Categorias'),
        getNotionData(import.meta.env.VITE_NOTION_MESES_ID, 'Meses'),
        getNotionData(import.meta.env.VITE_NOTION_GASTOS_ID, 'Gastos'),
        getNotionData(import.meta.env.VITE_NOTION_INGRESOS_ID, 'Ingresos')
      ])
    } else {
      // Throw new error
      throw new Error('No se ha configurado la clave de la API de Notion.')
    }
  } catch (error) {
    // Si no, devuelve los datos de ejemplo.
    console.error('Error obteniendo datos de Notion:', error)
    return [[], [], [], []] // Retornar arrays vacíos en caso de error
  }
}

// Crear el Proveedor del Contexto
const NotionDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const loadNotionData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })

      try {
        const [categories, months, expenses, income] = await fetchData()

        if (
          !categories?.length ||
          !months?.length ||
          !expenses?.length ||
          !income?.length
        ) {
          throw new Error('No se pudieron obtener los datos.')
        }

        // Mapea los datos.
        const mappedCategories = mapCategories(categories)
        const mappedMonths = mapMonths(months)
        const mappedExpenses = mapExpenses(
          expenses,
          mappedCategories,
          mappedMonths
        )

        const data = {
          categories: mappedCategories,
          months: mappedMonths,
          expenses: mappedExpenses,
          income
        }

        dispatch({ type: 'SET_LOADING', payload: false })
        dispatch({ type: 'SET_NOTION_DATA', payload: data })
        dispatch({
          type: 'SET_CATEGORIES_DATA',
          payload: groupCategories(data.expenses)
        })
      } catch (error) {
        console.error('Error al cargar los datos:', error)
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }
    loadNotionData()
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
