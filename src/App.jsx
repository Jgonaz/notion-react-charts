import './styles/styles.scss'
import Header from './components/Header.jsx'
import Expenses from './components/routes/Expenses.jsx'
import Difference from './components/routes/Difference.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Expenses />
  },
  {
    path: '/expenses',
    element: <Expenses />
  },
  {
    path: '/difference',
    element: <Difference />
  }
])
function App () {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  )
}

export default App
