---
title: 弹窗
order: 6
---

# Modal 弹窗

```jsx
import React from 'react'
import { Button, Modal } from 'yj-design-components'

const data = [
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
const Index = () => {
  const modalRef = React.useRef()
  const items = React.useMemo(() => {
    return {
      r: {
        id: 1,
        name: '张三',
        gender: 0,
        age: 18,
        createTime: new Date()
      },
      data: data
    }
  }, [])
  return (
    <>
      <Button
        onClick={() => {
          modalRef.current[1](h => !h)
        }}
      >
        编辑弹窗
      </Button>
      <Modal
        controlDisplay={modalRef}
        onFinish={v => console.log(v)}
        items={items}
      />
    </>
  )
}

export default Index
```

```jsx
import React from 'react'
import { Button, Modal } from 'yj-design-components'

const items = {
  r: null,
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
  const modalRef = React.useRef()
  return (
    <>
      <Button
        onClick={() => {
          modalRef.current[1](h => !h)
        }}
      >
        新增弹窗
      </Button>
      <Modal
        controlDisplay={modalRef}
        onFinish={v => console.log(v)}
        items={items}
      />
    </>
  )
}

export default Index
```

## Api

| 参数           |             说明              |           类型            | 默认值 |
| :------------- | :---------------------------: | :-----------------------: | :----: |
| controlDisplay | 用来控制弹窗显示与隐藏的`ref` |        `React.ref`        |        |
| isM            |      判断是弹窗还是抽屉       |         `boolean`         | `true` |
| isForm         |       是否需要表单弹窗        |         `boolean`         | `true` |
| title          |      非表单弹窗时的标题       |  `string` \| `ReactNode`  |        |
| items          |     配置表单项与回显数据      | [ItemsProps](#ItemsProps) |  `{}`  |
| onFinish       |      点击完成时候的事件       |  `(values: any) => any`   |        |

<h3 id="ItemsProps">ItemsProps</h3>

| 参数 |                   说明                   | 类型  | 默认值 |
| :--- | :--------------------------------------: | :---: | :----: |
| r    |             `表格`中的行数据             | `any` |        |
| data | 需要现实的表单组件 类似`表单`中的`items` | `any` |        |
