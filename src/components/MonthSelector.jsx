import { useContext } from 'react'
import { NotionDataContext } from '../contexts/NotionDataContext.jsx'
import { groupByCategories } from '../utils/dataMapping.js'

export default function MonthSelector () {
  const { notionData, setPieChartData, monthFilter, setMonthFilter } =
    useContext(NotionDataContext)

  const monthOptions = [
    { value: '', label: 'Todos los meses' },
    ...notionData.meses.map(month => {
      return { value: month.id, label: month.value }
    })
  ]

  const onChangeFilter = month => {
    setMonthFilter(month)
    setPieChartData(prevState =>
      groupByCategories(
        month === 'Todos los meses'
          ? notionData.gastos
          : notionData.gastos.filter(gasto => gasto.Mes === month)
      )
    )
  }

  return (
    <div className='month-selector'>
      <select
        value={monthFilter}
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
