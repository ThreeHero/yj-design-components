import { Tooltip } from 'antd'
import { formatDate, findLabelByValue } from '../utils/tools'

export function generateColumns(columns, { seral }) {
  const _columns = []
  const _searchItems = []
  // 判断是否含有序号列
  if (seral) {
    const seralField = {
      title: seral.title ?? '序号',
      width: seral.width ?? 100,
      render: (t, r, i) => i + 1
    }
    _columns[0] = seralField
  }
  const newColumns = columns?.map(column => {
    const title = column.title || column.label || column.text
    const dataIndex = column.dataIndex || column.value || column.name
    const { matchOptions, dateFormatter, render, search, tooltip, ...rest } = column

    let newColumn = { ...column, title, dataIndex }

    if (render && typeof render === 'function') {
      return {
        ...rest,
        title,
        dataIndex,
        render
      }
    }
    // 格式化日期 可以为boolean / string
    if (dateFormatter) {
      newColumn = {
        ...rest,
        title,
        dataIndex,
        render: (t, r, i) => {
          let format = typeof dateFormatter === 'string' ? dateFormatter : 'YYYY-MM-DD HH:mm:ss'
          const value = r[dataIndex]
          if (value) {
            return formatDate(value, format)
          }
          return value
        }
      }
    }
    if (matchOptions) {
      newColumn = {
        ...rest,
        title,
        dataIndex,
        render: t => findLabelByValue(matchOptions, t)
      }
    }

    if (tooltip) {
      // 1. matchOptions

      newColumn.render = (t, r, i) => {
        let value = t
        value = matchOptions ? findLabelByValue(matchOptions, t) : value
        value = dateFormatter ? formatDate(t) : value

        return (
          <Tooltip
            title={value}
            placement="topLeft"
          >
            {value}
          </Tooltip>
        )
      }
      newColumn.tooltip = tooltip
    }

    if (search) {
      const _search = {
        label: title,
        name: dataIndex,
        options: matchOptions
      }
      if (dateFormatter) {
        _search.element = {
          type: 'dateRange'
        }
      }
      if (typeof search === 'object') {
        _search.element = search
      }
      _searchItems.push(_search)
    }

    return newColumn
  })

  return {
    columns: [..._columns, ...newColumns],
    search: _searchItems
  }
}
