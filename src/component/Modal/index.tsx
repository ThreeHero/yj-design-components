import React, { useState, useCallback } from 'react'
import { Modal, Drawer, message, Space, Button } from 'antd'
import Form from '../Form'
import type YJModalProps from './ModalProps'

const Index: React.FC<YJModalProps> = (props) => {
  // isM 是弹窗还是抽屉 isForm 是表单弹窗 controlDisplay ref对象 items包含r和data的对象
  const { controlDisplay, isM = true, isForm = true, title, onFinish = () => { }, items = { r: null, data: [] }, ...rest } = props || {}
  const [form] = Form.useForm()
  controlDisplay.current = useState(false)
  const o = controlDisplay.current
  let ComponentModal = isM ? Modal : Drawer

  // 非表单弹窗时 显示的标题
  const t = title || (isForm && (items.r ? '编辑' : '新增'))

  const onOK = useCallback(async () => {
    // 区分是否为表单弹窗
    if (isForm) {
      // 进行表单校验
      try {
        const values = await form.validateFields()
        await onFinish(values)
        o[1](false)
      } catch {
        message.error('请按照规则填写')
      }
    } else {
      await onFinish()
    }
  }, [isForm, onFinish])

  let modal = (
    <ComponentModal
      {...rest}
      title={t}
      open={o[0]}
      destroyOnClose
      closeIcon={!isM}
      cancelText="取消"
      okText="完成"
      onCancel={() => o[1](false)}
      onClose={() => o[1](false)}
      zIndex={99999999999}
      onOk={onOK}
      extra={
        <Space>
          <Button onClick={() => o[1](false)}>取消</Button>
          <Button
            onClick={onOK}
            type="primary"
          >
            完成
          </Button>
        </Space>
      }
    >
      {isForm && (
        <Form
          form={form}
          items={items.data}
          initialValues={items.r}
          preserve={false}
        />
      )}
    </ComponentModal>
  )

  return modal
}

export default Index
