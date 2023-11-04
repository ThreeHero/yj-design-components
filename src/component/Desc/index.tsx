import { Descriptions, Spin } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { findLabelByValue, ObjectIsNull } from '../utils/tools'
import type YJDescProps from './DescProps'

const Index: React.FC<YJDescProps> = (props) => {
  const { bordered = true, getData = () => { }, params, titleMap, map, addOther = () => { }, ...rest } = props || {}

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function get() {
      if (typeof getData === 'function') {
        setLoading(true)
        try {
          const res = await getData(params)
          setData(res)
        } finally {
          setLoading(false)
        }
      } else {
        setData(getData)
      }
    }
    get()
  }, [params])

  const items = useMemo(() => {
    const res = Object.keys(data).map(key => {
      let children = null
      if (key in map && Array.isArray(map[key])) {
        children = findLabelByValue(map[key], data[key])
      } else if (key in map && typeof map[key] === 'function') {
        children = map[key](data[key])
      } else if (typeof data[key] === 'object') {
        children = '-'
      } else {
        children = data[key]
      }

      return {
        label: titleMap[key] || '-',
        children
      }
    })

    let other = []
    if (!ObjectIsNull(data)) {
      other = addOther(data) || []
    }
    return [...res, ...other]
  }, [data, titleMap, map])

  let desc = (
    <Descriptions
      bordered={bordered}
      {...rest}
      items={items}
    />
  )

  return loading ? <Spin /> : desc
}

export default Index
