---
title: 描述列表
order: 4
---

# Desc 描述列表

```jsx
import { Desc } from 'yj-design-components'
import React from 'react'

const Index = () => {
  const titleMap = {
    id: 'id',
    username: '用户名',
    gender: '性别',
    createTime: '出生日期',
    pUser: '父级名字'
  }
  const map = {
    gender: [
      { value: 0, label: '未知' },
      { value: 1, label: '男' },
      { value: 2, label: '女' }
    ],
    createTime: date => {
      return date.getFullYear()
    },
    pUser: object => {
      return object.username
    }
  }
  const r = () => ({
    id: 2,
    username: 'admin',
    gender: 1,
    createTime: new Date(),
    pUser: {
      id: 1,
      username: 'root',
      gender: 0,
      createTime: new Date(),
      pUser: null
    }
  })
  const request = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: 2,
          username: 'admin',
          gender: 1,
          createTime: new Date(),
          pUser: {
            id: 1,
            username: 'root',
            gender: 0,
            createTime: new Date(),
            pUser: null
          }
        })
      }, 1000)
    })
  }

  const addOther = data => {
    return [{ label: '父级性别', children: data.pUser.gender }]
  }

  return (
    <Desc
      title="用户"
      column={2}
      getData={request}
      titleMap={titleMap}
      map={map}
      addOther={addOther}
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
