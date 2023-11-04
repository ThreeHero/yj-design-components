import React from 'react'

export default interface YJListProps {
  bordered: boolean
  // 数据 需要返回list
  request: (params) => Promise<{ list: any[]; total: number }> | { list: any[]; total: number }
  // 每行的唯一标识
  rowKey: string
  initParams: object
  onPageChange: ({ page, pageSize }) => void
  render: (item: any) => React.ReactNode
}
