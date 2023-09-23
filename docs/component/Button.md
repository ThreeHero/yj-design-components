---
title: 按钮
order: 3
---

# Button 按钮

按钮用于开始一个即时操作。

## 气泡选择确认按钮

```jsx
/**
 * title: 气泡按钮
 * desc: 点击按钮需要二次确认 适用于 删除 按钮
 * hideActions: ["CSB"]
 */
import { Button } from 'yj-design-components'
import React from 'react'

const Index = () => {
  return (
    <Button
      confirm
      onClick={e => console.log(e)}
      type="primary"
    >
      气泡选择按钮
    </Button>
  )
}

export default Index
```

```jsx
/**
 * title: 表单弹窗按钮
 * desc: 点击按钮可以弹出表单弹窗 适用于 编辑 新增 按钮
 * hideActions: ["CSB"]
 */
import { Button } from 'yj-design-components'
import React from 'react'
const items = {
  r: {
    id: 1,
    name: '张三',
    gender: 0,
    age: 18,
    createTime: new Date()
  },
  data: [
    { label: '姓名', name: 'name', element: { type: 'input' } },
    {
      label: '性别',
      name: 'gender',
      element: {
        type: 'select',
        options: [
          { value: 0, label: '未知' },
          { value: 1, label: '男' },
          { value: 2, label: '女' }
        ]
      }
    }
  ]
}
const Index = () => {
  return (
    <Button
      modal
      onClick={v => console.log(v)}
      type="link"
      items={items}
    >
      编辑
    </Button>
  )
}

export default Index
```

## Api

| 参数    |          说明          |                                             类型                                             | 默认值  |
| :------ | :--------------------: | :------------------------------------------------------------------------------------------: | :-----: |
| confirm | 是否需要弹出二次提示框 | [PopconfirmProps](https://ant-design.antgroup.com/components/popconfirm-cn#api) \| `boolean` | `false` |
| modal   |          弹窗          |                                          `boolean`                                           |         |
| items   |  配置表单项与回显数据  |                                  [ItemsProps](#ItemsProps)                                   |  `{}`   |
| onClick |        点击事件        |                                `(event: MouseEvent) => void`                                 |         |

<h3 id="ItemsProps">ItemsProps</h3>

| 参数 |                   说明                   | 类型  | 默认值 |
| :--- | :--------------------------------------: | :---: | :----: |
| r    |             `表格`中的行数据             | `any` |        |
| data | 需要现实的表单组件 类似`表单`中的`items` | `any` |        |
