import { Table, Tooltip } from 'antd'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { formatDate } from '../utils/tools'
import { SearchBar, Form } from '../..'
import type YJTableProps from './TableProps'

const Index: React.FC<YJTableProps> = props => {
  const {
    bordered = true,
    columns = [],
    request,
    seral,
    rowKey = 'id',
    align = 'center',
    ellipsis = true,
    style = {},
    search,
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
  const reSearch = useCallback((params: any) => {
    getList(params)
  }, [])

  // 初始请求数据
  useEffect(() => {
    getList()
  }, [])

  // 整理列
  const c = useMemo(() => {
    // 序号列
    if (seral) {
      columns.unshift({
        title: seral.title ?? '序号',
        width: seral.width ?? 100,
        render: (t, r, i: number) => (
          <Tooltip
            placement="top"
            title={i + 1}
          >
            {i + 1}
          </Tooltip>
        )
      })
    }
    // 超出隐藏
    const e = ellipsis
      ? {
          ellipsis: {
            showTitle: false
          },
          render: t => (
            <Tooltip
              placement="topLeft"
              title={t}
            >
              {t}
            </Tooltip>
          )
        }
      : {}
    // 操作列
    return columns.map(item => {
      let r = {}

      if (item.formatDate) {
        const format =
          typeof item.formatDate === 'string'
            ? item.formatDate
            : ((void 0 as any)(r as any).render = t => (
                <Tooltip
                  placement="topLeft"
                  title={formatDate(t, format)}
                >
                  {formatDate(t, format)}
                </Tooltip>
              ))
      }
      return {
        ...e,
        ...item,
        align,
        title: item.title || item.label || item.text,
        dataIndex: item.dataIndex || item.name || item.value,
        ...r
      }
    })
  }, [columns, align, seral, ellipsis])

  let table = (
    <Table
      bordered={bordered}
      style={{ userSelect: 'none', ...style }}
      rowKey={rowKey}
      columns={c}
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
  )

  if (search) {
    const [form] = Form.useForm()
    return (
      <>
        <SearchBar
          style={{ marginBottom: 20 }}
          {...search}
          search={reSearch}
          f={form}
        />
        <Table
          bordered={bordered}
          style={{ userSelect: 'none', ...style }}
          rowKey={rowKey}
          columns={c}
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
              reSearch(form.getFieldsValue())
            }
          }}
          {...rest}
        />
      </>
    )
  }

  return table
}

export default Index
