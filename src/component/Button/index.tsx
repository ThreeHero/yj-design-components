import React, { useRef } from 'react'
import { Button, Popconfirm, Popover } from 'antd'
import Modal from '../Modal'
import type ButtonProps from './ButtonProps'

const Index: React.FC<ButtonProps> & {
  Add?: any
  Delete?: any
  Edit?: any
  Search?: any
  Reload?: any
  Upload?: any
  Download?: any
  [icon: string]: any
} = props => {
  const { onClick, children, confirm, pop, modal, ...rest } = props || {}

  let btn = (
    <Button
      {...rest}
      onClick={onClick}
    >
      {children}
    </Button>
  )

  if (pop) {
    btn = (
      <Popover
        title={children}
        {...pop}
      >
        {btn}
      </Popover>
    )
  }

  if (confirm) {
    let config = confirm === true ? {} : confirm
    btn = (
      <Popconfirm
        title="确定删除？"
        okText="确定"
        cancelText="取消"
        {...config}
        onConfirm={onClick}
      >
        <Button {...rest}>{children}</Button>
      </Popconfirm>
    )
  }

  if (modal) {
    let m: any = {}
    if (typeof modal === 'object') {
      m = modal
    }
    const isShow = useRef()
    btn = (
      <>
        <Button
          {...rest}
          onClick={() => (isShow.current as Array<any>)[1]((h: boolean) => !h)}
        >
          {children}
        </Button>
        <Modal
          isShow={isShow}
          onFinish={onClick}
          form={{
            items: m?.items,
            initialValues: m?.initialValues
          }}
          {...m}
        />
      </>
    )
  }

  return btn
}

export default Index
