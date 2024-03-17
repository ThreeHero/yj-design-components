import React, { useState, useCallback } from 'react'
import { Modal, Drawer, message, Space, Button } from 'antd'
import Form from '../Form'
import type YJModalProps from './ModalProps'

const Index: React.FC<YJModalProps> = props => {
  // isM 是弹窗还是抽屉 isForm 是表单弹窗 isShow ref对象 items包含r和data的对象
  const { isShow, isM = true, form, title, onFinish = () => {}, children, footer, ...rest } = props || {}

  const [YjForm] = Form.useForm()
  isShow.current = useState(false)
  const show = isShow.current
  const ComponentModal = isM ? Modal : Drawer

  // 非表单弹窗时 显示的标题
  const t = title || (form && (form?.initialValues ? '编辑' : '新增'))

  const onOK = useCallback(async () => {
    // 区分是否为表单弹窗
    if (form) {
      // 进行表单校验
      try {
        const values = await YjForm.validateFields()
        await onFinish(values)
        show[1](false)
      } catch {
        message.error('请按照规则填写')
      }
    } else {
      await onFinish()
    }
  }, [form, onFinish])

  const _footer = footer && (
    <Space>
      <Button onClick={() => show[1](false)}>取消</Button>
      <Button
        onClick={onOK}
        type="primary"
      >
        完成
      </Button>
    </Space>
  )

  let modal = (
    <ComponentModal
      title={t}
      open={show[0]}
      destroyOnClose
      closeIcon={!isM}
      cancelText="取消"
      okText="完成"
      onCancel={() => show[1](false)}
      onClose={() => show[1](false)}
      footer={_footer}
      // zIndex={200}
      onOk={onOK}
      extra={_footer}
      {...rest}
    >
      {children}
      {!children && form && (
        <Form
          form={YjForm}
          preserve={false}
          limit={9999}
          {...(form || {})}
        />
      )}
    </ComponentModal>
  )

  return modal
}

export default Index
