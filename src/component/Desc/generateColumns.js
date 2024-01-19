import { formatDate, findLabelByValue } from '../utils/tools'

export function generateColumns(columns, data) {
  const newColumns = columns.map((column, index) => {
    const label = column.title || column.label || column.text
    const key = column.dataIndex || column.value || column.name || index
    const { matchOptions, dateFormatter, render, ...rest } = column

    let newColumn = column

    if (render && typeof render === 'function') {
      return {
        ...rest,
        label,
        key,
        children: render(data[key], data, index)
      }
    }

    if (dateFormatter) {
      const _render = (t, r, i) => {
        let format = typeof dateFormatter === 'string' ? dateFormatter : 'YYYY-MM-DD HH:mm:ss'
        const value = t
        if (value) {
          return formatDate(value, format)
        }
        return value
      }
      newColumn = {
        ...rest,
        label,
        key,
        children: _render(data[key], data, index)
      }
    }

    if (matchOptions) {
      newColumn = {
        ...rest,
        label,
        key,
        children: findLabelByValue(matchOptions, data[key])
      }
    }

    if (!newColumn.children) {
      newColumn = {
        ...rest,
        label,
        key,
        children: data[key]
      }
    }

    return newColumn
  })

  return [...newColumns]
}
