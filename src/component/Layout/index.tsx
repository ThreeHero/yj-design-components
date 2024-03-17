import React, { useMemo, useState } from 'react'
import { Layout } from 'antd'
import styles from './style.module.less'
import Sider from './SiderBar'
import Header from './HeaderBar'
import Content from './ContentBox'

import type YJLayoutProps from './LayoutProps'

const Index: React.FC<YJLayoutProps> = props => {
  const {
    bgColor = '#fff',
    color = '#000',
    triggerPosition = 'header',
    children,
    headerLeftContent,
    headerRightContent,
    logo = { ellipsis: '后台', complete: '后台管理系统' },
    slideMenu,
    ...rest
  } = props || {}
  // 是否折叠
  const [isFold, setIsFold] = useState(false)

  const params = useMemo(() => {
    return {
      color,
      bgColor,
      triggerPosition,
      setIsFold
    }
  }, [])

  return (
    <Layout className={styles['yj-layout']}>
      <Sider
        {...rest}
        {...params}
        isFold={isFold}
        logo={logo}
        slideMenu={slideMenu}
      />
      <Layout>
        <Header
          {...params}
          isFold={isFold}
          headerLeftContent={headerLeftContent}
          headerRightContent={headerRightContent}
        />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default Index
