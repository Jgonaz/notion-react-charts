import { useContext } from 'react'
import { NotionDataContext } from '../contexts/NotionDataContext.jsx'
import { groupGastos } from '../utils/dataMapping.js'

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
      groupGastos(notionData.gastos, month === 'Todos los meses' ? '' : month)
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
