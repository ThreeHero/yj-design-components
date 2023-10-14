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
  Space,
  Button,
  Upload
} from 'antd'
import Switch from './Switch'
// import Upload from './Upload'

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
                label={item.title || item.label || item.text}
                name={item.name || item.value || item.dataIndex}
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
          const title = item.text || item.label || item.title
          const name = item.name || item.value || item.dataIndex

          const i = (
            <Item
              key={item.name || index}
              {...r}
              label={title}
              name={name}
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
Index.Item = Form.Item
Index.List = Form.List
export default Index
