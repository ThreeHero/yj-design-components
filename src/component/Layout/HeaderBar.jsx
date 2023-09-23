import { Layout } from 'antd'
import { useMemo } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import styles from './style.module.less'

const { Header } = Layout

function HeaderBar(props) {
  const { color, bgColor, isFold, setIsFold, triggerPosition, headerLeftContent, headerRightContent } = props || {}

  const style = useMemo(() => {
    return {
      color: color,
      background: bgColor
    }
  })
  return (
    <Header
      style={style}
      className={styles['yj-header']}
    >
      {triggerPosition === 'header' ? (
        <>
          {isFold ? (
            <MenuUnfoldOutlined
              className={styles['yj-icon-fold']}
              onClick={e => setIsFold(false)}
            />
          ) : (
            <MenuFoldOutlined
              className={styles['yj-icon-fold']}
              onClick={e => setIsFold(true)}
            />
          )}
        </>
      ) : (
        <div>{headerLeftContent}</div>
      )}
      <div>{headerRightContent}</div>
    </Header>
  )
}

export default HeaderBar
