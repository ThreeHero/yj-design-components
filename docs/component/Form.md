---
title: 表单
order: 5
---

# Form 表单

```jsx
/**
 * hideActions: ["CSB"]
 */
import { Form } from 'yj-design-components'
import React from 'react'

const Index = () => {
  const [form] = Form.useForm()
  const items = React.useMemo(() => {
    return [
      {
        name: 'name',
        label: '姓名',
        rules: [{ required: true, message: '姓名必须填写' }],
        element: {
          type: 'input',
          placeholder: '请输入姓名'
        }
      },
      {
        name: 'password',
        label: '密码',
        element: {
          type: 'password',
          placeholder: '请输入密码'
        }
      },
      {
        name: 'price',
        label: '价格',
        element: {
          type: 'number',
          placeholder: '请输入价格'
        }
      },
      {
        name: 'gender',
        label: '性别',
        element: {
          type: 'select',
          placeholder: '请选择性别',
          options: [
            {
              value: 0,
              label: '未知'
            },
            {
              value: 1,
              label: '男'
            },
            {
              value: 2,
              label: '女'
            }
          ]
        }
      },
      {
        name: 'time',
        label: '购买时间',
        element: {
          type: 'time',
          placeholder: '请选择购买时间'
        }
      },
      {
        name: 'date',
        label: '购买日期',
        element: {
          type: 'date',
          placeholder: '请选择购买日期'
        }
      },
      {
        name: 'date2',
        label: '有效期',
        element: {
          type: 'dateRange'
        }
      },
      {
        name: 'color',
        label: '颜色',
        element: {
          type: 'color'
        }
      },
      {
        value: 'switch',
        label: '开关',
        element: {
          type: 'switch'
        }
      },
      {
        value: 'upload',
        label: '上传',
        valuePropName: 'fileList',
        getValueFromEvent: e => {
          if (Array.isArray(e)) return e
          return e && e.fileList
        },
        element: {
          type: 'upload',
          children: <div>{form.getFieldValue('upload') ? form.getFieldValue('upload')?.file?.name : '上传文件'}</div>
        }
      },
      {
        name: 'button',
        text: '按钮',
        element: {
          type: 'button',
          children: '按钮',
          onClick: () => {
            console.log(form.getFieldsValue())
          }
        }
      }
    ]
  }, [])
  return (
    <Form
      form={form}
      items={items}
    />
  )
}

export default Index
```

## Api

| 参数   |          说明          |                  类型                  | 默认值 |
| :----- | :--------------------: | :------------------------------------: | :----: |
| form   |      表单实例对象      |     [FormInstance](#FormInstance)      |        |
| layout |        布局方式        | `horizontal` \| `vertical` \| `inline` |        |
| items  | 表单内容 用于创建 Item |        [ItemProps](#ItemProps)         |        |

<h3 id="ItemProps">ItemProps</h3>

| 参数    |   说明   |             类型              | 默认值 |
| :------ | :------: | :---------------------------: | :----: |
| name    |  字段名  |           `string`            |        |
| rules   |   规则   |            `any[]`            |        |
| element | 元素类型 | [ElementProps](#ElementProps) |        |

<h3 id="ElementProps">ElementProps</h3>

| 参数    |     说明     |                                                                 类型                                                                 | 默认值 |
| :------ | :----------: | :----------------------------------------------------------------------------------------------------------------------------------: | :----: |
| type    |   元素类型   | `input` \| `password` \| `textarea` \| `number` \| `select` \| `time` \| `date` \| `dateRange` \| `color` \| `button` \| `ReactNode` |
| options | 元素的配置项 |                                                                `any`                                                                 |        |

<h3 id="FormInstance">FormInstance</h3>

```jsx | pure
import { Form } from 'yj-design-components'
import React from 'react'

export default () => {
  const [form] = Form.useForm()
  return <></>
}
```
