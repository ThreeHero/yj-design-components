import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言

dayjs.extend(isLeapYear) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言

export const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return '-'
  return dayjs(date).format(format)
}

export const findLabelByValue = (options, value) => {
  return options?.find(item => item.value === value)?.label ?? '-'
}

export const ObjectIsNull = object => {
  if (object) {
    return Object.keys(object).length <= 0
  }
}
