import React from 'react'

export default interface YJSearchBarProps {
  // 搜索 一般配合表格使用
  search: (params: any) => void
  // 右上角操作区域
  extra: React.ReactNode[] | React.ReactNode
  // 右上角操作区域位置
  extraIndex: 'before' | 'middle' | 'after'
  // 搜索按钮隐藏
  searchButton: {
    hidden: boolean
    [buttonProps: string]: any
  }
  // 重置按钮隐藏
  resetButton: {
    hidden: boolean
    [buttonProps: string]: any
  }
  f: any // form示例 最高权重 内部使用
  // 表单参数
  form: any
  style: any
  className: any
  // // 与form的item一致
  // items: any
  // // 一行几个
  // span?: number
}
