import React, { useRef } from 'react'
import { Button, Popconfirm } from 'antd'
import Modal from '../Modal'
import type ButtonProps from './ButtonProps'

const Index: React.FC<ButtonProps> = (props) => {
  const { onClick, children, confirm, modal, items, ...rest } = props || {}

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
          title: '确定删除？',
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
    let m = {}
    if (typeof modal === 'object') {
      m = modal
    }
    const controlDisplay = useRef()
    btn = (
      <>
        <Button
          {...rest}
          onClick={() => (controlDisplay.current as Array<any>)[1]((h: boolean) => !h)}
        >
          {children}
        </Button>
        <Modal
          controlDisplay={controlDisplay}
          onFinish={onClick}
          {...m}
          items={items}
        />
      </>
    )
  }

  return btn
}

export default Index
