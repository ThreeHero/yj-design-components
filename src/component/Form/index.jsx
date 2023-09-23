import React from 'react'
import { Form, Input, Select, InputNumber, TimePicker, DatePicker, ColorPicker, Space, Button } from 'antd'

const FormItem = {
  input: Input,
  password: Input.Password,
  textarea: Input.TextArea,
  number: InputNumber,
  select: Select,
  time: TimePicker,
  date: DatePicker,
  dateRange: DatePicker.RangePicker,
  color: ColorPicker,
  button: Button
}

// 渲染Item
function createFormItem(element) {
  const { type, ...rest } = element || {}
  const Component = FormItem[type]
  return <Component {...rest} />
}

const { Item } = Form
function Index(props) {
  const { items, form, children, layout, ...rest } = props || {}
  let YjForm = (
    <Form
      autoComplete="off"
      form={form}
      layout={layout}
      {...rest}
    >
      {layout === 'inline' ? (
        <Space wrap>
          {items?.map((item, index) => {
            const { element = { type: 'input' }, ...r } = item || {}
            const isEle = React.isValidElement(element)
            const i = (
              <Item
                key={item.name || index}
                {...r}
              >
                {isEle ? element : createFormItem(element)}
              </Item>
            )
            return i
          })}
        </Space>
      ) : (
        items?.map((item, index) => {
          const { element = { type: 'input' }, ...r } = item || {}
          const isEle = React.isValidElement(element)
          const i = (
            <Item
              key={item.name || index}
              {...r}
            >
              {isEle ? element : createFormItem(element)}
            </Item>
          )
          return i
        })
      )}
      {!items && children}
    </Form>
  )

  return YjForm
}

Index.useForm = Form.useForm
export default Index
