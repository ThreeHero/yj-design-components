import { TableProps, TableColumnsType } from 'antd/lib'
import React from 'react'

interface seralType {
  title: string | React.ReactNode
  width: number
}

export default interface YJTableProps extends TableProps {
  // 表格列
  columns: TableColumnsType[]
  // 数据 需要返回list
  request: () => Promise<{ list: any[] }> | { list: any[] }
  // 显示序号
  seral?: boolean | seralType
  // 每行的唯一标识
  rowKey: string
  // 对其方式
  align?: 'left' | 'right' | 'center'
  // 是否可选中
  selectable:
    | boolean
    | {
        onChange: (selectedRowKeys, selectedRows, info) => any
      }
  ellipsis: boolean
  // 是否可拖拽 不建议和序号一起使用
  draggable: boolean
  initParams: object
  onPageChange: (page, pageSize) => void
}
