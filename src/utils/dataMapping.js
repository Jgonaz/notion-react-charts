export const mapGastos = (gastos, categorias, meses) => {
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
      return meses.find(cat => cat.id === item[0].id).value || null
    }

    const mapCategory = item => {
      return categorias.find(cat => cat.id === item[0].id).value || null
    }

    return gastos.map(data => {
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

export const mapMeses = data => {
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

export const mapCategorias = data => {
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

// Agrupa todos los gastos por categoría
export const groupByCategories = data => {
  // Crear un objeto para almacenar la suma de cantidades por categoría
  const categoriasSuma = {}

  // Procesar los datos y sumar las cantidades por categoría
  data.forEach(item => {
    const categoria = item.Categoría
    const cantidad = item.Cantidad

    // Si la categoría ya existe en el objeto, sumar la cantidad
    if (categoriasSuma[categoria]) {
      categoriasSuma[categoria] += cantidad
    } else {
      // Si la categoría no existe, crearla y establecer la cantidad
      categoriasSuma[categoria] = cantidad
    }
  })

  // Convertir el objeto en un array para usarlo con Recharts
  const datosAgrupados = Object.keys(categoriasSuma).map(categoria => ({
    Categoría: categoria,
    Cantidad: categoriasSuma[categoria]
  }))

  return datosAgrupados
}
