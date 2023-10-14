import { DescriptionsProps } from 'antd'

export default interface YJDescProps extends DescriptionsProps {
  // 获取描述列表数据 函数 或 对象
  getData: object | (() => object | Promise<object>)
  // 获取数据函数的参数 如果直接传入数据 则不需要参数
  params: any
  // 描述列表的label映射关系 根据字段对应
  titleMap: object
  // 描述列表的值映射关系 可以为 函数 或 数组 (label and value)
  map: object
  // 数据不够时追加数据的函数 参数为传入的数据 需返回 label children格式 对象数组
  addOther: (data) => any[]
}
