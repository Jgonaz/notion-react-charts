import { Link } from 'react-router-dom'

export default function Header () {
  return (
    <div
      className='flex-center'
      style={{
        padding: '15px',
        gap: '10px',
        marginBottom: '25px',
        background: '#f9f9f9'
      }}
    >
      <Link to='/expenses'>
        <button type='button' className='main-btn'>
          Ver gastos
        </button>
      </Link>
      <Link to='/differences'>
        <button type='button' className='main-btn'>
          Ver ingresos
        </button>
      </Link>
    </div>
  )
}
