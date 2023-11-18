import { mapGastos } from '../utils/dataMapping.js'

const URL = import.meta.env.VITE_NODE_URL

// Obtiene todos los registros de una base de datos
export const getNotionData = async (databaseId, databaseName) => {
  let allRecords = []

  const fetchPage = async (startCursor = null) => {
    let url = `${URL}/get-database/${databaseId}`
    if (startCursor) url += `?start_cursor=${startCursor}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Error al obtener datos.' + databaseName)
      }

      const data = await response.json()

      allRecords.push(...data.results)

      if (data.has_more) {
        // Si hay más resultados, realiza la siguiente solicitud recursivamente
        await fetchPage(data.next_cursor)
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  // Inicia la solicitud de la primera página
  await fetchPage()

  // Devuelve todos los registros recolectados
  allRecords = mapGastos(allRecords)
  console.log(databaseName, allRecords)
  return allRecords
}

// Obtiene las propiedades de una página
export const getNotionPage = async pageUrl => {
  try {
    const response = await fetch(`${URL}/${pageUrl}`)
    if (!response.ok) {
      throw new Error('Error al obtener datos.' + pageUrl)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Obtiene las propiedades de una base de datos
export const getNotionDatabase = async databaseUrl => {
  try {
    const response = await fetch(`${URL}/${databaseUrl}`)
    if (!response.ok) {
      throw new Error('Error al obtener datos.' + databaseUrl)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
