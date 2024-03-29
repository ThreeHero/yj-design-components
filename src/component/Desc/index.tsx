import { Descriptions, Spin } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import type YJDescProps from './DescProps'
import { generateColumns } from './generateColumns'

const Index: React.FC<YJDescProps> = props => {
  const { bordered = true, request, data: dataSource, columns, ...rest } = props || {}

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  async function get() {
    if (request && typeof request === 'function') {
      setLoading(true)
      try {
        const res = await request()
        setData(res)
      } finally {
        setLoading(false)
      }
    } else {
      setData(dataSource)
    }
  }

  useEffect(() => {
    get()
  }, [])

  if (loading || !data) {
    return <Spin />
  }

  const _c = generateColumns(columns, data)

  let desc = (
    <Descriptions
      bordered={bordered}
      {...rest}
      items={_c}
    />
  )

  return desc
}

export default Index
