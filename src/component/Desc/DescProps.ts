import { DescriptionsProps } from 'antd'

export default interface YJDescProps extends DescriptionsProps {
  // 获取描述列表数据 函数 或 对象
  request: () => object | Promise<object>
  data: any
  // 获取数据函数的参数 如果直接传入数据 则不需要参数
  params: any
  columns: any
}
