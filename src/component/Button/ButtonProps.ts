import { ButtonProps, PopconfirmProps, PopoverProps } from 'antd'

interface ItemsProps {
  // 行数据
  r: any | null
  // 与form的item一致
  data: any
}

export default interface YJButtonProps extends Omit<ButtonProps, 'onClick'> {
  // 二次确认
  confirm?: PopconfirmProps | boolean
  // 弹窗
  modal?: any
  // 气泡卡片
  pop?: PopoverProps
  // 配置表单项与回显数据
  items?: ItemsProps
  // 点击最终确认事件
  onClick?: (e: any) => any
}
