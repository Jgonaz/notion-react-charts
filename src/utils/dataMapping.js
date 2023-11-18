export const mapGastos = gastos => {
  const mapData = function (data, item) {
    switch (data) {
      case 'rich_text':
        return mapRichText(item)
      case 'title':
        return mapTitle(item)
      case 'date':
        return mapDate(item)
      case 'relation':
        return mapRelation(item)
      default:
        return item
    }
  }

  const mapRichText = item => {
    return item[0]?.plain_text || ''
  }

  const mapTitle = item => {
    return item[0]?.plain_text || ''
  }

  const mapDate = item => {
    return item?.start || ''
  }

  const mapRelation = item => {
    return item
  }

  return gastos.map(data => {
    const item = {}
    Object.entries(data.properties).forEach(([key, value]) => {
      item[key] = mapData(value.type.toString(), value[value.type.toString()])
    })
    return item
  })
}
