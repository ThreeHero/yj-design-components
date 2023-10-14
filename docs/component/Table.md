---
title: 表格
order: 4
---

# Table 表格

```jsx
/**
 * hideActions: ["CSB"]
 */
import { Table } from 'yj-design-components'
import React from 'react'

const columns = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  }
]

const Index = () => {
  const request = params => {
    console.log(params)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          list: [
            {
              id: 1,
              name: '这里测试超出隐藏这里测试超出隐藏这里测试超出隐藏这里测试超出隐藏这里测试超出隐藏这里测试超出隐藏这里测试超出隐藏这里测试超出隐藏这里测试超出隐藏这里测试超出隐藏'
            },
            { id: 2, name: 'b' },
            { id: 3, name: 'c' }
          ]
        })
      }, 100)
    })
  }
  return (
    <Table
      seral
      rowKey="id"
      bordered
      request={request}
      selectable={{ onChange: (_, data) => console.log(data) }}
      initParams={{ page: 1 }}
      draggable
      columns={columns}
    />
  )
}

export default Index
```

## Api

| 参数       |               说明               |                                    类型                                     |  默认值  |
| :--------- | :------------------------------: | :-------------------------------------------------------------------------: | :------: |
| columns    |            表格列数据            | [ColumnsType](https://ant-design.antgroup.com/components/table-cn#column)[] |          |
| request    |       表格请求的(分页)数据       |            `() => Promise<{ list: any[] }>` \| `{ list: any[] }`            |          |
| seral      |           是否显示序号           |                    `boolean` \| [seralType](#seralType)                     | `false`  |
| rowKey     |           行的唯一标识           |                                  `string`                                   |   `id`   |
| align      |             对齐方式             |                        `left` \| `right` \| `center`                        | `center` |
| selectable |             是否可选             |  `boolean` \| `{ onChange: (selectedRowKeys, selectedRows, info) => any }`  | `false`  |
| ellipsis   |           是否超出省略           |                                  `boolean`                                  |  `true`  |
| draggable  | 是否可拖拽(不建议和序号一起使用) |                                  `boolean`                                  | `false`  |

<h3 id="seralType">seralType</h3>

| 参数  |    说明    |          类型           | 默认值 |
| :---- | :--------: | :---------------------: | :----: |
| title | 序号列标题 | `string` \| `ReactNode` | `序号` |
| width | 序号列宽度 |        `number`         | `100`  |
