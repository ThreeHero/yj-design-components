import React from 'react'
import { Layout, Space } from 'antd'
import styles from './style.module.less'
import cns from 'classnames'

const { Header } = Layout

function HeaderBar(props) {
  const { logo, headerBgColor, headerMenu, isFixed, headerClass } = props || {}
  return (
    <Header
      className={cns(styles['yj-header'], {
        [styles['yj-fixed-header']]: isFixed,
        [headerClass]: true
      })}
      style={{ background: headerBgColor }}
    >
      <div>{logo}</div>
      <Space>{headerMenu}</Space>
    </Header>
  )
}

export default HeaderBar
