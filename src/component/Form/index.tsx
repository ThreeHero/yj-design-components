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
  Col
} from 'antd'
import Switch from './Switch'
import Editor from './Editor'
import Upload from './Upload'
import type YJFormProps from './FormProps'
import React from 'react'

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
function createFormItem(element: any) {
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
  const { items, form, children, layout, span = 3, ...rest } = props || {}

  let YjForm = (
    <Form
      autoComplete="off"
      form={form}
      layout={layout}
      labelCol={{ span: 4 }}
      labelAlign="left"
      {...rest}
    >
      {layout === 'inline' ? (
        <Row gutter={[24, 24]}>
          {items?.map((item: any, index: number) => {
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
              <Col
                span={Math.floor(24 / span)}
                key={item.name || item.value || item.dataIndex || index}
              >
                <Item
                  {...r}
                  label={item.title || item.label || item.text}
                  name={item.name || item.value || item.dataIndex}
                >
                  {isEle ? element : createFormItem(element ?? ele)}
                </Item>
              </Col>
            )
          })}
        </Row>
      ) : (
        items?.map((item: any, index: number) => {
          const { element, ...r } = item || {}
          const isEle = element ? React.isValidElement(element) : false
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
            <Item
              key={item.name || index}
              {...r}
              label={item.title || item.label || item.text}
              name={item.name || item.value || item.dataIndex}
            >
              {isEle ? element : createFormItem(element ?? ele)}
            </Item>
          )
        })
      )}
      {!items && children}
    </Form>
  )

  return YjForm
}

Index.useForm = Form.useForm
Index.Item = Form.Item
Index.List = Form.List
Index.Editor = Editor
Index.Upload = Upload

export default Index
