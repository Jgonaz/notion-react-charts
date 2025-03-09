import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/main.scss'
import Header from './components/Header.jsx'
import Expenses from './components/routes/Expenses.jsx'
import Difference from './components/routes/Difference.jsx'

function App () {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Expenses />} />
        <Route path='/expenses' element={<Expenses />} />
        <Route path='/differences' element={<Difference />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
