export default interface YJSearchBarProps {
  // 与form的item一致
  items: any
  // 设置传递给表格的 initParams 的修改
  setInitParams: (params: any) => void
  // 右上角操作区域
  extra: any[]
  // 搜索按钮隐藏
  searchHidden: boolean
  // 重置按钮隐藏
  resetHidden: boolean
}
