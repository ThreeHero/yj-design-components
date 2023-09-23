import { FormInstance, FormProps } from 'antd'

export default interface YJFormProps extends FormProps {
  form: FormInstance
  layout?: 'horizontal' | 'vertical' | 'inline'
  items: any
}
