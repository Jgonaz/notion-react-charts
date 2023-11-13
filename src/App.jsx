import './App.css'
import { useEffect } from 'react'
import { getCategorias, getGastos, getIngresos } from './services/api.js'

function App () {
  useEffect(() => {
    getCategorias()
    getGastos()
    getIngresos()
  }, [])

  return (
    <>
      <p>Hello, world!</p>
    </>
  )
}

export default App
