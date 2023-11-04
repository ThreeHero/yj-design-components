import React, { useCallback } from 'react'
import { Form } from '../..'
import { Space, Button } from 'antd'
import type YJSearchBarProps from './SearchBarProps'

const Index: React.FC<YJSearchBarProps> = (props) => {
  const { items, setInitParams = () => { }, extra, searchHidden, resetHidden } = props || {}
  const [form] = Form.useForm()

  const reset = useCallback(() => {
    form.resetFields()
    search()
  }, [])

  const search = useCallback(() => {
    const flied = form.getFieldsValue()
    setInitParams(flied)
  }, [])

  return (
    <Space
      align="baseline"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 20
      }}
    >
      <Form
        form={form}
        layout="inline"
        items={items}
      />
      <Space>
        {!searchHidden && (
          <Button
            type="primary"
            onClick={search}
          >
            搜索
          </Button>
        )}
        {!resetHidden && <Button onClick={reset}>重置</Button>}
        {Array.isArray(extra) && extra
          ? extra?.map((item, index) => {
            return <React.Fragment key={index}>{item}</React.Fragment>
          })
          : extra}
      </Space>
    </Space>
  )
}

export default Index
