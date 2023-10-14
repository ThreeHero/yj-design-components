---
title: 列表
order: 4
---

# List 列表

```jsx
import { App, List } from 'yj-design-components'
import React from 'react'

const request = params => {
  console.log(params)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        list: [
          { id: 1, name: 'a' },
          { id: 2, name: 'b' },
          { id: 3, name: 'c' },
          { id: 4, name: 'd' },
          { id: 5, name: 'e' },
          { id: 6, name: 'f' },
          { id: 7, name: 'g' },
          { id: 8, name: 'h' },
          { id: 9, name: 'i' },
          { id: 10, name: 'j' }
        ]
      })
    }, 100)
  })
}

const { Item } = List
export default () => {
  const render = item => {
    return <Item>{item.name}</Item>
  }
  return (
    <App>
      <List
        request={request}
        render={render}
      />
    </App>
  )
}
```
