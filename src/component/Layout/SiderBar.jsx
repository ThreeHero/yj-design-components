import React, { useMemo } from 'react'
import { Layout, Menu } from 'antd'
import styles from './style.module.less'

const { Sider } = Layout

function SiderBar(props) {
  const { bgColor, isFold, setIsFold, triggerPosition, logo, slideMenu } = props || {}

  const style = useMemo(() => {
    return {
      background: bgColor
    }
  })
  const fold =
    triggerPosition === 'bottom'
      ? {
          collapsible: true,
          onCollapse: v => setIsFold(v)
        }
      : {}
  return (
    <Sider
      style={style}
      collapsed={isFold}
      className={styles['yj-slide']}
      {...fold}
    >
      <div className={styles['yj-logo']}>{isFold ? logo.ellipsis : logo.complete}</div>
      <Menu
        mode="inline"
        defaultSelectedKeys={slideMenu?.items.filter(item => window.location.pathname.includes(item.key))}
        {...slideMenu}
      />
    </Sider>
  )
}

export default SiderBar
