export const formatCurrency = amount => {
  return amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
}

// Función de comparación para ordenar por la propiedad 'Fecha' de forma descendente
export const compareDates = (a, b, type) => {
  const fechaA = new Date(a.Fecha)
  const fechaB = new Date(b.Fecha)

  if (fechaA > fechaB) {
    return type === 'desc' ? -1 : 1
  } else if (fechaA < fechaB) {
    return type === 'desc' ? 1 : -1
  } else {
    return 0
  }
}
