---
title: 描述列表
order: 4
---

# Desc 描述列表

```jsx
import { Desc } from 'yj-design-components'
import { Avatar } from 'antd'
import React from 'react'

const src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn_8JEBVesEraEHKybTjlYb1EOGn0nX621SpE96CO_Sw&s'

const Index = () => {
  const columns = [
    {
      name: 'src',
      span: 2,
      contentStyle: {
        justifyContent: 'center'
      },
      render: (t, r, i) => <Avatar src={t} />
    },
    {
      title: '用户名',
      name: 'username'
    },
    {
      title: '性别',
      name: 'gender',
      matchOptions: [
        { value: 0, label: '未知' },
        { value: 1, label: '男' },
        { value: 2, label: '女' }
      ]
    },
    {
      title: '出生日期',
      name: 'createTime',
      dateFormatter: true
    },
    {
      title: '父级名字',
      name: 'pUser',
      render: (t, r, i) => {
        return t?.username
      }
    },
    {
      title: '父级id',
      name: 'pUser',
      render: (t, r, i) => {
        return t?.id
      }
    }
  ]
  const data = {
    id: 2,
    username: 'admin',
    gender: 1,
    createTime: new Date(),
    src: src,
    pUser: {
      id: 1,
      username: 'root',
      gender: 0,
      createTime: new Date(),
      pUser: null
    }
  }
  const request = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, 1000)
    })
  }

  return (
    <Desc
      bordered={false}
      column={2}
      data={data}
      columns={columns}
    />
  )
}
export default Index
```

## Api

| 参数     |                                     说明                                      |                      类型                       | 默认值 |
| :------- | :---------------------------------------------------------------------------: | :---------------------------------------------: | :----: |
| getData  |                         获取描述列表数据 函数 或 对象                         | `object` \| (`() => object \| Promise<object>`) |        |
| params   |               获取数据函数的参数 如果直接传入数据 则不需要参数                |                      `any`                      |        |
| titleMap |                    描述列表的 label 映射关系 根据字段对应                     |                    `object`                     |        |
| map      |          描述列表的值映射关系 可以为 函数 或 数组 (label and value)           |                    `object`                     |        |
| addOther | 数据不够时追加数据的函数 参数为传入的数据 需返回 label children 格式 对象数组 |                `(data) => any[]`                |
