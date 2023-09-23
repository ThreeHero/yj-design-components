import React from 'react'
import { Layout, Breadcrumb } from 'antd'
import styles from './style.module.less'

const { Content } = Layout

function ContentBox(props) {
  const { children } = props || {}
  return (
    <Content className={styles['yj-content']}>
      {/* 面包屑 */}
      <div className={styles['yj-container']}>{children}</div>
    </Content>
  )
}

export default ContentBox
