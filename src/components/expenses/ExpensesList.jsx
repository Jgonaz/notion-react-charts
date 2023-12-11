import '@src/styles/components/ExpensesList.scss'
import { formatCurrency } from '@src/utils/utils.js'
import { useContext } from 'react'
import { NotionDataContext } from '@src/contexts/NotionDataContext.jsx'
import { groupExpenses } from '@src/utils/dataMapping.js'

const ExpensesList = () => {
  const { state, dispatch } = useContext(NotionDataContext)

  const handleOrder = (property, type) => {
    const expensesData = groupExpenses(
      state.notionData.expenses,
      state.expensesData[0].Categoría,
      state.monthFilter,
      { property, type }
    )
    dispatch({ type: 'SET_EXPENSES_ORDER', payload: { property, type } })
    dispatch({ type: 'SET_EXPENSES_DATA', payload: expensesData })
  }

  return (
    <div className='bills-table'>
      <div className='row header'>
        <div
          className='cell cursor-pointer'
          onClick={() =>
            handleOrder(
              'Fecha',
              state.expensesOrder.type === 'asc' ? 'desc' : 'asc'
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
              state.expensesOrder.type === 'asc' ? 'desc' : 'asc'
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
      {state.expensesData.map((objeto, index) => (
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

export default ExpensesList
