import React from 'react'

interface ItemsProps {
  // 行数据
  r: any | null
  // 与form的item一致
  data: any
}

export default interface YJModalProps {
  // 用于控制显示与隐藏的ref
  controlDisplay: any
  // 判断是弹窗还是抽屉
  isM?: boolean
  // 是否需要表单弹窗
  isForm?: boolean
  // 非表单弹窗时的标题
  title?: string | React.ReactNode
  // 配置表单项与回显数据
  items?: ItemsProps
  // 完成时候的事件
  onFinish?: (values?: any) => any
}
