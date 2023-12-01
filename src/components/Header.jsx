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
      <button type='button' className='main-btn'>
        Ver gastos
      </button>
      <button type='button' className='main-btn'>
        Ver diferencias
      </button>
    </div>
  )
}
