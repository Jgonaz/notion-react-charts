export const formatCurrency = amount => {
  return amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
}

export const obtenerInformacionFechas = datos => {
  const dates = datos.map(item => new Date(item.Fecha))

  const firstDay = new Date(Math.min(...dates))
  const lastDay = new Date(Math.max(...dates))

  const totalDays = Math.floor((lastDay - firstDay) / (24 * 60 * 60 * 1000)) + 1

  return {
    firstDay: firstDay.toISOString().split('T')[0],
    lastDay: lastDay.toISOString().split('T')[0],
    totalDays
  }
}
