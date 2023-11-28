import { chartColors, chartBorderColors } from '../constants/chartColors'
import { compareDates, compareQuantities } from './utils'

export const mapExpenses = (expenses, categories, months) => {
  try {
    const mapData = function (data, item, property) {
      switch (data) {
        case 'rich_text':
          return item[0]?.plain_text || ''
        case 'title':
          return item[0]?.plain_text || ''
        case 'date':
          return item?.start || ''
        case 'relation':
          if (property === 'Mes') return mapMonth(item)
          else if (property === 'Categoría') return mapCategory(item)
          else return null
        default:
          return item
      }
    }

    const mapMonth = item => {
      return months.find(cat => cat.id === item[0].id).value || null
    }

    const mapCategory = item => {
      return categories.find(cat => cat.id === item[0].id).value || null
    }

    return expenses.map(data => {
      const item = {}
      Object.entries(data.properties).forEach(([key, value]) => {
        item[key] = mapData(
          value.type.toString(),
          value[value.type.toString()],
          key
        )
      })
      return item
    })
  } catch (e) {
    console.error('Error al mapear gastos', e)
    return []
  }
}

export const mapMonths = data => {
  const months = []
  try {
    data.map(item => {
      if (months.some(month => month.id === item.id)) return null
      months.push({
        id: item.id,
        value: item.properties['Título'].title[0].plain_text
      })
      return item
    })
    return months
  } catch (e) {
    console.error('Error al mapear meses', e)
    return []
  }
}

export const mapCategories = data => {
  const categories = []
  try {
    data.map(item => {
      if (categories.some(cat => cat.id === item.id)) return null
      categories.push({
        id: item.id,
        value: item.properties['Título'].title[0].plain_text
      })
      return item
    })
    return categories
  } catch (e) {
    console.error('Error al mapear categorías', e)
    return []
  }
}

// Agrupa todos los gastos por categoría y mes (si hay filtro indicado)
export const groupCategories = (expenses, month) => {
  // Crear un objeto para almacenar la suma de cantidades por categoría
  const totalCategories = {}
  let total = 0

  // Procesar los datos y sumar las cantidades por categoría
  expenses.forEach(item => {
    const category = item.Categoría
    const quantity = !month || item.Mes === month ? item.Cantidad : 0

    // Sumar la cantidad al total
    total += quantity

    // Si la categoría ya existe en el objeto, sumar la cantidad
    if (totalCategories[category]) {
      totalCategories[category] += quantity
    } else {
      // Si la categoría no existe, crearla y establecer la cantidad
      totalCategories[category] = quantity
    }
  })

  // Convertir el objeto en un array para usarlo con Recharts
  const datosAgrupados = Object.keys(totalCategories).map((category, index) => {
    const quantity = totalCategories[category]
    const percentage = total > 0 ? ((quantity / total) * 100).toFixed(2) : 0

    return {
      Categoría: category,
      Cantidad: quantity,
      Porcentaje: percentage,
      Color: chartColors[index],
      BorderColor: chartBorderColors[index]
    }
  })

  return datosAgrupados
}

// Devuelve los gastos por categoría, mes (si hay filtro indicado) y orden
export const groupExpenses = (expenses, category, month, order) => {
  // Filtrar los gastos por categoría y mes
  const filteredExpenses = expenses.filter(gasto => {
    return (
      gasto.Categoría === category &&
      (month === 'Todos los meses' || gasto.Mes === month)
    )
  })

  switch (order.property) {
    case 'Fecha':
      filteredExpenses.sort((a, b) => compareDates(a, b, order.type))
      break
    case 'Cantidad':
      filteredExpenses.sort((a, b) => compareQuantities(a, b, order.type))
      break
    default:
      break
  }

  return filteredExpenses
}
