const URL = import.meta.env.VITE_NODE_URL

export const getCategorias = () => {
  fetch(`${URL}/get-database`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
}
export const getGastos = () => {
  const URL = 'http://localhost:3000'
  fetch(`${URL}/get-gastos`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
}

export const getIngresos = () => {
  const URL = 'http://localhost:3000'
  fetch(`${URL}/get-ingresos`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
}
