import { useContext } from 'react'
import { NotionDataContext } from '../contexts/NotionDataContext.jsx'
import { groupCategories } from '../utils/dataMapping.js'

export default function MonthSelector () {
  const { state, dispatch } = useContext(NotionDataContext)

  const monthOptions = [
    { value: '', label: 'Todos los meses' },
    ...(state.notionData?.months || []).map(month => {
      return { value: month.id, label: month.value }
    })
  ]

  const onChangeFilter = month => {
    dispatch({ type: 'SET_MONTH_FILTER', payload: month })
    dispatch({
      type: 'SET_CATEGORIES_DATA',
      payload: groupCategories(
        state.notionData?.expenses,
        month === 'Todos los meses' ? '' : month
      )
    })
  }

  return (
    <div className='month-selector'>
      <select
        value={state.monthFilter}
        onChange={e => onChangeFilter(e.target.value)}
      >
        {monthOptions.map((month, index) => (
          <option key={index} value={month.label}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  )
}
