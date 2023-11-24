import '../styles/components/BillsTable.scss'
import PropTypes from 'prop-types'
import { formatCurrency } from '../utils/utils'

const BillsTable = ({ data }) => {
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
      {data.map((objeto, index) => (
        <div key={index} className='row'>
          <div className='cell'>{objeto.Fecha}</div>
          <div className='cell'>{formatCurrency(objeto.Cantidad)}</div>
          <div className='cell'>{objeto['Título']}</div>
          <div className='cell'>{objeto['Descripción']}</div>
        </div>
      ))}
    </div>
  )
}

BillsTable.propTypes = {
  data: PropTypes.array.isRequired
}

export default BillsTable
