import { TableProps } from 'antd/lib'
import React from 'react'

interface seralType {
  title: string | React.ReactNode
  width: number
}

export default interface YJTableProps {
  bordered: boolean
  // 表格列
  columns: any[]
  // 数据 需要返回list
  request: (params) => Promise<{ list: any[]; total: number }> | { list: any[]; total: number }
  // 显示序号
  seral?: any
  style?: any
  // 每行的唯一标识
  rowKey: string
  // 对其方式
  align?: 'left' | 'right' | 'center'
  // 是否可选中
  selectable: any
  ellipsis: boolean
  // 是否可拖拽 不建议和序号一起使用
  draggable: boolean
  initParams: object
  onPageChange: ({ page, pageSize }) => void
}
