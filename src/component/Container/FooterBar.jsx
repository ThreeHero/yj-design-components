import React from 'react'
import { Layout } from 'antd'
import styles from './style.module.less'
import cns from 'classnames'

const { Footer } = Layout

function FooterBar(props) {
  const { footerClass, children } = props || {}
  return <Footer className={cns(styles['yj-footer'], footerClass)}>{children}</Footer>
}

export default FooterBar
