import React, { forwardRef, useCallback, useState, useEffect, useImperativeHandle } from 'react'
import { List as AntdList } from 'antd'

const Index = forwardRef(({ request, rowKey = 'id', render, ...rest }, ref) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const getList = useCallback(
    async params => {
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

  useEffect(() => {
    getList()
  }, [page, pageSize])

  useImperativeHandle(ref, () => {
    return {
      search: getList
    }
  })

  return (
    <AntdList
      rowKey={rowKey}
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
      renderItem={render}
      {...rest}
    />
  )
})

Index.Item = AntdList.Item
export default Index
