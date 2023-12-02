import './styles/styles.scss'
import Header from './components/Header.jsx'
import Expenses from './components/routes/Expenses.jsx'
import Difference from './components/routes/Difference.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Expenses />
      </>
    )
  },
  {
    path: '/expenses',
    element: (
      <>
        <Header />
        <Expenses />
      </>
    )
  },
  {
    path: '/differences',
    element: (
      <>
        <Header />
        <Difference />
      </>
    )
  }
])

function App () {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
