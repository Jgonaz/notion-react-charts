import '../styles/components/BillsTable.scss'
import { formatCurrency } from '../utils/utils'
import { useContext } from 'react'
import { NotionDataContext } from '../contexts/NotionDataContext.jsx'
import { groupGastos } from '../utils/dataMapping.js'

const BillsTable = () => {
  const { state, dispatch } = useContext(NotionDataContext)

  const handleOrder = (property, type) => {
    const modalData = groupGastos(
      state.notionData.gastos,
      state.modalData[0].Categoría,
      state.monthFilter,
      { property, type }
    )
    dispatch({ type: 'SET_MODAL_ORDER', payload: { property, type } })
    dispatch({ type: 'SET_MODAL_DATA', payload: modalData })
  }

  return (
    <div className='bills-table'>
      <div className='row header'>
        <div
          className='cell cursor-pointer'
          onClick={() =>
            handleOrder(
              'Fecha',
              state.modalOrder.type === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          <strong>Fecha</strong>
        </div>
        <div
          className='cell cursor-pointer'
          onClick={() =>
            handleOrder(
              'Cantidad',
              state.modalOrder.type === 'asc' ? 'desc' : 'asc'
            )
          }
        >
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

export default BillsTable
