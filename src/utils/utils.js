export const formatCurrency = amount => {
  return amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
}
