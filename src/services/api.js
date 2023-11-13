const URL = import.meta.env.VITE_NODE_URL

export const getCategorias = () => {
  fetch(`${URL}/get-categorias`)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Error al obtener datos, get-categorias')
    })
    .then(data => {
      console.log('Categorias: ', data)
    })
    .catch(error => {
      console.error(error)
    })
}
export const getGastos = () => {
  fetch(`${URL}/get-gastos`)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Error al obtener datos, get-gastos')
    })
    .then(data => {
      console.log('Gastos: ', data)
    })
    .catch(error => {
      console.error(error)
    })
}

export const getIngresos = () => {
  fetch(`${URL}/get-ingresos`)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Error al obtener datos, get-ingresos')
    })
    .then(data => {
      console.log('Ingresos: ', data)
    })
    .catch(error => {
      console.error(error)
    })
}
