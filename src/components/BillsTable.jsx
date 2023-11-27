import '../styles/components/BillsTable.scss'
import PropTypes from 'prop-types'
import { formatCurrency } from '../utils/utils'
import { useContext } from 'react'
import { NotionDataContext } from '../contexts/NotionDataContext.jsx'

const BillsTable = () => {
  const { state } = useContext(NotionDataContext)

  return (
    <div className='bills-table'>
      <div className='row header'>
        <div className='cell'>
          <strong>Fecha</strong>
        </div>
        <div className='cell'>
          <strong>Cantidad</strong>
        </div>
        <div className='cell'>
          <strong>Título</strong>
        </div>
        <div className='cell'>
          <strong>Descripción</strong>
        </div>
      </div>
      {state.modalData.map((objeto, index) => (
        <div key={index} className='row'>
          <div className='cell' data-label='Fecha:'>
            {objeto.Fecha}
          </div>
          <div className='cell' data-label='Cantidad:'>
            {formatCurrency(objeto.Cantidad)}
          </div>
          <div className='cell' data-label='Título:'>
            {objeto['Título']}
          </div>
          <div className='cell' data-label='Descripción:'>
            {objeto['Descripción']}
          </div>
        </div>
      ))}
    </div>
  )
}

BillsTable.propTypes = {
  data: PropTypes.array.isRequired
}

export default BillsTable
