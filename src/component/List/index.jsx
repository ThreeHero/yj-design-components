import React, { useMemo } from 'react'
import { List } from 'antd'
import { useState, useEffect } from 'react'

function Index(props) {
  const {
    bordered = true,
    rowKey = 'id',
    render = () => {},
    request,
    initParams,
    onPageChange = () => {},
    ...rest
  } = props || {}

  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const requestParams = useMemo(() => {
    return {
      page: 1,
      pageSize: 10,
      ...(initParams || {})
    }
  }, [initParams])

  useEffect(() => {
    async function getList() {
      setLoading(true)
      try {
        const { list: l, total: t } = (await request(requestParams)) || {}
        setList(l)
        setTotal(t)
      } finally {
        setLoading(false)
      }
    }
    getList()
  }, [requestParams])

  let listComponent = (
    <List
      bordered={bordered}
      pagination={{
        current: requestParams.page,
        pageSize: requestParams.pageSize,
        total,
        showSizeChanger: true,
        pageSizeOptions: [
          requestParams.pageSize * 1,
          requestParams.pageSize * 2,
          requestParams.pageSize * 3,
          requestParams.pageSize * 4
        ],
        showTotal: total => `共 ${total} 条`,
        onChange: (page, pageSize) => {
          onPageChange?.({ ...requestParams, page, pageSize })
        }
      }}
      {...rest}
      rowKey={rowKey}
      dataSource={list}
      loading={loading}
      renderItem={item => render?.(item)}
    />
  )

  return listComponent
}

Index.Meta = List.Item.Meta
Index.Item = List.Item

export default Index
