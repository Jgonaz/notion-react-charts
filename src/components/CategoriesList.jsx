import '../styles/components/_CategoriesList.scss'
import { useContext } from 'react'
import { NotionDataContext } from '../contexts/NotionDataContext.jsx'
import { formatCurrency } from '../utils/utils.js'

const CategoriesList = () => {
  const { state } = useContext(NotionDataContext)

  // Ordenar las categorías por cantidad descendente
  const categoriasOrdenadas = [...state.pieChartData].sort(
    (a, b) => b.Cantidad - a.Cantidad
  )

  return (
    <div className='categories-list'>
      <div className='category-total'>
        <span>
          Total:{' '}
          {formatCurrency(
            categoriasOrdenadas.reduce(
              (total, categoria) => total + categoria.Cantidad,
              0
            )
          )}
        </span>
      </div>
      {categoriasOrdenadas.map((categoria, index) => (
        <div
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
    </div>
  )
}

export default CategoriesList
