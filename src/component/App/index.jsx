import React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

function Index(props) {
  const { children, token, language = zhCN, ...rest } = props || {}
  return (
    <ConfigProvider
      {...rest}
      theme={{ token }}
      locale={language}
    >
      {children}
    </ConfigProvider>
  )
}

export default Index
