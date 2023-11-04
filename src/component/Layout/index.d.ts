import React = require('react')
import { ItemType } from 'antd/lib'

export default interface YJLayoutProps {
  // 背景色
  bgColor?: string
  // 头部和侧边栏文字颜色
  color?: string
  // 折叠器触发位置
  triggerPosition?: 'header' | 'bottom'
  // 当触发器为bottom时 头部左侧的内容
  headerLeftContent?: React.ReactNode
  // 头部右侧的内容
  headerRightContent?: React.ReactNode
  // logo 折叠的logo 和 完整的logo
  logo?: {
    complete: string
    ellipsis: string
  }
  // 侧边菜单
  slideMenu: {
    items: ItemType[]
    onClick: ({ item, key, keyPath, domEvent }) => any
  }
}
