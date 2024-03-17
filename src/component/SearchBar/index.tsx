import React, { useCallback } from 'react'
import { Form, Button } from '../..'
import { Space, Row, Col } from 'antd'
import type YJSearchBarProps from './SearchBarProps'

const Index: React.FC<YJSearchBarProps> = props => {
  const { f, form, search, extra, extraIndex = 'after', searchButton, resetButton, style, className } = props || {}
  const [yjForm] = Form.useForm()
  const formInstance = f ?? yjForm

  const YjSearch = useCallback(() => {
    const flied = formInstance.getFieldsValue()
    search(flied)
  }, [search, formInstance])

  const reset = useCallback(() => {
    formInstance.resetFields()
    YjSearch()
  }, [YjSearch, formInstance])

  let ext = null

  if (React.isValidElement(extra)) {
    ext = extra
  } else if (Array.isArray(extra)) {
    ext = extra.map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)
  }

  return (
    <Row
      wrap={false}
      style={style}
      className={className}
      gutter={30}
    >
      <Col flex="auto">
        <Form
          form={formInstance}
          span={3}
          labelCol={{ span: 4 }}
          labelAlign="left"
          {...form}
          // layout="inline"
          // style={{ ...(form?.style || {}), display: 'block' }}
        />
      </Col>
      <Col>
        <Space>
          {extraIndex === 'before' && ext}
          {!searchButton?.hidden && (
            <Button.Search
              type="primary"
              children="搜索"
              {...(searchButton || {})}
              onClick={YjSearch}
            />
          )}
          {extraIndex === 'middle' && ext}
          {!resetButton?.hidden && (
            <Button.Reload
              children="重置"
              {...(resetButton || {})}
              onClick={reset}
            />
          )}
          {extraIndex === 'after' && ext}
        </Space>
      </Col>
    </Row>
  )
}

export default Index
