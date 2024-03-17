import { FormInstance, FormProps } from 'antd'
import React from 'react'

export default interface YJFormProps extends FormProps {
  form: FormInstance
  layout?: 'horizontal' | 'vertical' | 'inline'
  items: any
  // 内联布局时候一行几个
  span?: number
  // 超过几行显示折叠
  limit?: number
  children?: React.ReactNode
}
