---
title: 搜索条
order: 5
---

# SearchBar 搜索条

```jsx
/**
 * hideActions: ["CSB"]
 * iframe: 800
 */
import { SearchBar, Button } from 'yj-design-components'
import React from 'react'

const items = [
  {
    name: 'name',
    label: '姓名',
    element: {
      type: 'input',
      placeholder: '请输入姓名'
    }
  },
  {
    name: 'gender',
    label: '性别',
    element: {
      type: 'select',
      placeholder: '请选择',
      options: [
        { value: 1, label: '男' },
        { value: 2, label: '女' }
      ]
    }
  },
  {
    name: 'gender',
    label: '性别',
    element: {
      type: 'dateRange',
      placeholder: '请选择'
    }
  },
  {
    name: 'gender',
    label: '性别',
    element: {
      type: 'dateRange',
      placeholder: '请选择'
    }
  }
]

const Index = () => {
  return (
    <SearchBar
      form={{ items: items }}
      extra={[<Button.Add>新增</Button.Add>]}
      extraIndex="middle"
    />
  )
}

export default Index
```

## Api

| 参数          |                 说明                 |                  类型                  |   默认值   |
| :------------ | :----------------------------------: | :------------------------------------: | :--------: |
| items         |              搜索条内容              | [ItemProps](/component/form#ItemProps) |            |
| extra         |           右上角的操作区域           |             `ReactNode[]`              |            |
| searchHidden  |           是否隐藏搜索按钮           |               `boolean`                |  `false`   |
| resetHidden   |           是否隐藏重置按钮           |               `boolean`                |  `false`   |
| setInitParams | 设置初始值 配置表格使用 用于刷新表格 |        `(params: any) => void`         | `() => {}` |
