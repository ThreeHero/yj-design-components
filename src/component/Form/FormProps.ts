import { FormInstance, FormProps } from 'antd'

export default interface YJFormProps extends FormProps {
  form: FormInstance
  layout?: 'horizontal' | 'vertical' | 'inline'
  items: any
  // 内联布局时候一行几个
  span?: number
}
