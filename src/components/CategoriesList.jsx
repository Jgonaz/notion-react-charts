import '../styles/components/CategoriesList.scss'
import '../styles/components/Modal.scss'
import { useContext, useState } from 'react'
import { NotionDataContext } from '../contexts/NotionDataContext.jsx'
import { formatCurrency } from '../utils/utils.js'
import Modal from 'react-modal'
import { groupGastos } from '../utils/dataMapping.js'
import BillsTable from './BillsTable.jsx'

// Debes invocar a esta función solo una vez en tu aplicación
Modal.setAppElement('#app')

const CategoriesList = () => {
  const { state } = useContext(NotionDataContext)
  const [showModal, setShowModal] = useState(false)
  const [contentModal, setContentModal] = useState(false)

  const toggleModal = (open, category) => {
    if (open) {
      const modalData = groupGastos(
        state.notionData.gastos,
        category,
        state.monthFilter
      )
      setContentModal(modalData)
    } else setContentModal(undefined)
    setShowModal(open)
  }

  // Ordenar las categorías por cantidad descendente
  const orderCategories = [...state.pieChartData].sort(
    (a, b) => b.Cantidad - a.Cantidad
  )

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
          onClick={() => toggleModal(true, categoria)}
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
      >
        {contentModal && <BillsTable data={contentModal} />}
        <button onClick={() => toggleModal(false)}>Cerrar</button>
      </Modal>
    </div>
  )
}

export default CategoriesList
