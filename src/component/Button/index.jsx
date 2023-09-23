import React, { useRef } from 'react'
import { Button, Popconfirm } from 'antd'
import Modal from '../Modal'

function Index(props) {
  const { confirm, onClick, children, modal, items, ...rest } = props || {}

  let btn = (
    <Button
      {...rest}
      onClick={onClick}
    >
      {children}
    </Button>
  )

  if (confirm) {
    let options =
      typeof confirm === 'boolean'
        ? {
            title: '确定删除',
            okText: '确定',
            cancelText: '取消'
          }
        : confirm
    btn = (
      <Popconfirm
        {...options}
        onConfirm={onClick}
      >
        <Button {...rest}>{children}</Button>
      </Popconfirm>
    )
  }

  if (modal) {
    const controlDisplay = useRef()
    btn = (
      <>
        <Button
          {...rest}
          onClick={() => controlDisplay.current[1](h => !h)}
        >
          {children}
        </Button>
        <Modal
          controlDisplay={controlDisplay}
          items={items}
          onFinish={onClick}
        />
      </>
    )
  }

  return btn
}

export default Index
