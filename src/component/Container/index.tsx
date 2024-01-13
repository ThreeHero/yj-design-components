import React from 'react'
import { Layout } from 'antd'
import styles from './style.module.less'
import HeaderBar from './HeaderBar'
import ContentBox from './ContentBox'
import FooterBar from './FooterBar'

import type YJContainerProps from './ContainerProps';

const Index: React.FC<YJContainerProps> = (props) => {
  const {
    logo = <div>模板</div>, // 头部左侧logo展示
    headerBgColor = '#fff', // 头部背景色不能用主题色 使用次级主题色
    isFixed = false, // 头部是否固定
    headerMenu, // 头部右侧功能区域
    headerClass = 'YJ_HEADER',
    children,
    contentClass = 'YJ_CONTENT',
    isFooter = true, // 是否隐藏底部
    footerClass = 'YJ_FOOTER',
    footerContent,
    ...rest
  } = props || {}
  return (
    <Layout className={styles['yj-container']} {...rest}>
      <HeaderBar
        headerClass={headerClass}
        logo={logo}
        headerBgColor={headerBgColor}
        isFixed={isFixed}
        headerMenu={headerMenu}
      />
      {/* 占位元素 */}
      {isFixed && <div className={styles['yj-placeholder']} />}
      <ContentBox contentClass={contentClass}>{children}</ContentBox>
      {isFooter && <FooterBar footerClass={footerClass}>{footerContent}</FooterBar>}
    </Layout>
  )
}

export default Index
