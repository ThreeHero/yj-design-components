import { ItemType } from 'antd/lib'
import React = require('react')

export default interface YJContainerProps {
  // 头部左上角的logo (点击事件 回到首页)
  logo: React.ReactDOM
  // 头部的背景颜色 不要使用主题色 请使用二级主题色
  headerBgColor?: React.CSSProperties
  // 是否固定头部
  isFixed?: boolean
  // 头部右侧功能区域
  headerMenu: React.ReactDOM
  // 是否展示Footer
  isFooter?: boolean
}
