import { mapGastos } from '../utils/dataMapping.js'
import gastosMockup from '../mockups/gastos.json'

const URL = import.meta.env.VITE_NODE_URL

export const getNotionData = async databaseUrl => {
  let allRecords = []

  const fetchPage = async (startCursor = null) => {
    let url = `${URL}/${databaseUrl}`
    if (startCursor) url += `?start_cursor=${startCursor}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Error al obtener datos.' + databaseUrl)
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
  //await fetchPage()

  allRecords = gastosMockup

  // Devuelve todos los registros recolectados
  allRecords = mapGastos(allRecords)
  console.log(databaseUrl, allRecords)
  return allRecords
}
