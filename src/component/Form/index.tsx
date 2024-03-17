import {
  Form,
  Input,
  Select,
  Checkbox,
  Radio,
  Rate,
  Slider,
  InputNumber,
  TimePicker,
  DatePicker,
  ColorPicker,
  Button,
  Row,
  Col,
  Divider
} from 'antd'
import Switch from './Switch'
import Editor from './Editor'
import Upload from './Upload'
import type YJFormProps from './FormProps'
import React, { useState } from 'react'
import { chunk } from 'lodash'

const FormItem = {
  input: Input,
  password: Input.Password,
  textarea: Input.TextArea,
  search: Input.Search,
  checkout: Checkbox.Group,
  radio: Radio.Group,
  color: ColorPicker,
  rate: Rate,
  switch: Switch,
  slider: Slider,
  number: InputNumber,
  select: Select,
  date: DatePicker,
  dateRange: DatePicker.RangePicker,
  time: TimePicker,
  timeRange: TimePicker.RangePicker,
  upload: Upload,
  uploadImg: Upload.Image,
  button: Button,
  editor: Editor,
  ['editor.show']: Editor.Show
}

// 渲染Item
function createFormItem(element: any, name: string) {
  const { type, ...rest } = element || {}
  const Component = FormItem[type]
  const is100 = [
    'input',
    'password',
    'textarea',
    'search',
    'slider',
    'number',
    'select',
    'date',
    'dateRange',
    'time',
    'timeRange',
    'editor',
    'editor.show'
  ]

  return (
    <Component
      style={is100.includes(type) ? { width: '100%' } : {}}
      placeholder={name}
      {...rest}
    />
  )
}

const { Item } = Form

const Index: React.FC<YJFormProps> & {
  useForm: any
  List: any
  Item: any
  Editor: any
  Upload: any
} = props => {
  const { items, form, children, layout, span = 1, limit = 1, ...rest } = props || {}
  const [show, setShow] = useState(false)
  const chunkItems = chunk(items, span)

  return (
    <Form
      autoComplete="off"
      form={form}
      layout={layout}
      // labelCol={{ span: 4 }}
      // labelAlign="left"
      {...rest}
    >
      {children || (
        <>
          <Row gutter={30}>
            {chunkItems.map((itemList: any[], index: number) => {
              return itemList.map((item, itemIndex) => {
                const name = item.name || item.value || item.dataIndex || itemIndex
                const title = item.title || item.label || item.text
                const { element, ...r } = item || {}
                const isEle = React.isValidElement(element)
                let ele = null
                // 如果item中有options 则视为下拉框
                if (r.options) {
                  ele = {
                    type: 'select',
                    options: r.options,
                    allowClear: true
                  }
                } else {
                  ele = {
                    type: 'input'
                  }
                }
                return (
                  index < limit && (
                    <Col
                      span={r.span ?? Math.floor(24 / span)}
                      key={name}
                    >
                      <Item
                        {...r}
                        label={title}
                        name={name}
                      >
                        {isEle ? element : createFormItem(element ?? ele, title)}
                      </Item>
                    </Col>
                  )
                )
              })
            })}
          </Row>
          <Row gutter={30}>
            {chunkItems.map((itemList: any[], index: number) => {
              return itemList.map((item, itemIndex) => {
                const name = item.name || item.value || item.dataIndex || itemIndex
                const title = item.title || item.label || item.text
                const { element, ...r } = item || {}
                const isEle = React.isValidElement(element)
                let ele = null
                // 如果item中有options 则视为下拉框
                if (r.options) {
                  ele = {
                    type: 'select',
                    options: r.options,
                    allowClear: true
                  }
                } else {
                  ele = {
                    type: 'input'
                  }
                }
                return (
                  index >= limit &&
                  show && (
                    <Col
                      span={r.span ?? Math.floor(24 / span)}
                      key={name}
                    >
                      <Item
                        {...r}
                        label={title}
                        name={name}
                      >
                        {isEle ? element : createFormItem(element ?? ele, title)}
                      </Item>
                    </Col>
                  )
                )
              })
            })}
          </Row>
          {chunkItems?.length > limit && (
            <Divider>
              <Button onClick={() => setShow(h => !h)}>{show ? '收起' : '展开'}</Button>
            </Divider>
          )}
        </>
      )}
    </Form>
  )
}

Index.useForm = Form.useForm
Index.Item = Form.Item
Index.List = Form.List
Index.Editor = Editor
Index.Upload = Upload

export default Index
