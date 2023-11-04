import React from 'react'
import { Layout } from 'antd'
import styles from './style.module.less'
import cns from 'classnames'

const { Content } = Layout

function ContentBox(props) {
  const { children, contentClass } = props || {}
  return <Content className={cns(styles['yj-content'], contentClass)}>{children}</Content>
}

export default ContentBox
