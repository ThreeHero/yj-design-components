import { Table, Tooltip } from 'antd'
import React, { useState, useEffect, useMemo, useCallback, forwardRef, useImperativeHandle } from 'react'
import { SearchBar, Form } from '../..'
import type YJTableProps from './TableProps'
import { generateColumns } from './generateColumns'

const Index: React.FC<YJTableProps> = forwardRef((props, ref) => {
  const {
    bordered = true,
    columns = [],
    request,
    seral,
    rowKey = 'id',
    align = 'center',
    style = {},
    tooltip,
    search,
    ellipsis = true,
    ...rest
  } = props || {}

  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // 处理好的请求
  const getList = useCallback(
    async (params: any = {}) => {
      setLoading(true)
      try {
        const data = {
          page,
          pageSize,
          ...params
        }
        const { list: l, total: t } = await request(data)
        setList(l)
        setTotal(t)
      } finally {
        setLoading(false)
      }
    },
    [page, pageSize]
  )

  // 重新加载
  const reSearch = useCallback(
    (params: any) => {
      getList(params)
    },
    [page, pageSize]
  )

  // 初始请求数据
  useEffect(() => {
    getList(form.getFieldsValue())
  }, [page, pageSize])

  const _c = generateColumns(columns, { seral }).columns.map(item => {
    const { render, ...rest } = item
    let _render = render

    const isRender = typeof render === 'function'

    if (tooltip && !item.tooltip) {
      _render = (t: any, r: any, i: number) => {
        const value = isRender ? render(t, r, i) : t
        return <Tooltip title={value}>{value}</Tooltip>
      }
    }

    return {
      align,
      ellipsis: ellipsis && {
        showTitle: false
      },
      ...rest,
      render: _render
    }
  })

  const searchItems = useMemo(() => {
    return generateColumns(columns, { seral }).search
  }, [])

  const [form] = Form.useForm()
  const { form: searchForm, ...searchRest } = search || {}
  const { items = [], ...searchFormRest } = searchForm || {}

  useImperativeHandle(ref, () => {
    return {
      search: () => {
        return reSearch(form.getFieldsValue())
      },
      ...form
    }
  })

  return (
    <>
      {(search || !!searchItems.length) && (
        <SearchBar
          style={{ marginBottom: 20 }}
          form={{
            items: [...items, ...searchItems],
            ...searchFormRest
          }}
          {...searchRest}
          search={reSearch}
          f={form}
        />
      )}
      <Table
        bordered={bordered}
        style={{ userSelect: 'none', ...style }}
        rowKey={rowKey}
        columns={_c}
        dataSource={list}
        loading={loading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total,
          showSizeChanger: true,
          showTotal: total => `共 ${total} 条`,
          onChange: (page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }
        }}
        {...rest}
      />
    </>
  )
})

export default Index
