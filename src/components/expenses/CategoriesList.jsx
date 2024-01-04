import '@src/styles/components/CategoriesList.scss'
import '@src/styles/components/Modal.scss'
import { useContext, useState } from 'react'
import { NotionDataContext } from '@src/contexts/NotionDataContext.jsx'
import { formatCurrency } from '@src/utils/utils.js'
import Modal from 'react-modal'
import { groupExpenses } from '@src/utils/dataMapping.js'
import ExpensesList from './ExpensesList.jsx'

// Debes invocar a esta función solo una vez en tu aplicación
Modal.setAppElement('#app')

const CategoriesList = () => {
  const { state, dispatch } = useContext(NotionDataContext)
  const [showModal, setShowModal] = useState(false)

  const toggleModal = (open, category) => {
    if (open) {
      const order = { property: 'Fecha', type: 'desc' }
      const expensesData = groupExpenses(
        state.notionData.expenses,
        category,
        state.monthFilter,
        order
      )
      dispatch({ type: 'SET_EXPENSES_ORDER', payload: order })
      dispatch({ type: 'SET_EXPENSES_DATA', payload: expensesData })
    } else {
      setTimeout(() => {
        dispatch({ type: 'SET_EXPENSES_DATA', payload: [] })
      }, 250)
    }
    setShowModal(open)
  }

  // Ordenar las categorías por cantidad descendente
  const orderCategories = [...state.categoriesData].sort(
    (a, b) => b.Cantidad - a.Cantidad
  )

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      width: '80%',
      maxHeight: '80vh',
      height: 'fit-content',
      margin: 'auto', // Centro la modal horizontalmente
      overflowY: 'auto' // Agrega desplazamiento vertical si es necesario
    }
  }

  return (
    <div className='categories-list'>
      <div className='category-total'>
        <span>
          Total:{' '}
          {formatCurrency(
            orderCategories.reduce(
              (total, categoria) => total + categoria.Cantidad,
              0
            )
          )}
        </span>
      </div>
      {orderCategories.map((categoria, index) => (
        <div
          onClick={() => toggleModal(true, categoria.Categoría)}
          key={index}
          className='category'
          style={{
            backgroundColor: categoria.Color,
            borderColor: categoria.BorderColor
          }}
        >
          <div className='category-info'>
            <div>
              <span className='category-percentage'>
                {categoria.Porcentaje} %
              </span>
              <span className='category-name'>{categoria.Categoría}</span>
            </div>
            <span className='category-quantity'>
              {formatCurrency(categoria.Cantidad)}
            </span>
          </div>
        </div>
      ))}
      <Modal
        isOpen={showModal}
        onRequestClose={() => toggleModal(false)}
        closeTimeoutMS={250}
        style={modalStyle}
      >
        <div className='modal'>
          <div className='modal-header'>
            <span onClick={() => toggleModal(false)}>&times;</span>
          </div>
          <div>
            {state.expensesData && <ExpensesList />}
            <button
              className='main-btn'
              style={{ marginTop: '1.5rem' }}
              type='button'
              onClick={() => toggleModal(false)}
            >
              <span>Cerrar</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CategoriesList
