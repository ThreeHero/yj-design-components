---
title: 登录
order: 7
---

# Login 登录

```jsx
/**
 * iframe: 500
 */
import React from 'react'
import { Login } from 'yj-design-components'

const login = ({ username, password }) => {
  console.log(username, password)
}

export default () => {
  return <Login onLogin={login} />
}
```

## Api

| 参数       | 说明                | 类型                            | 默认值                                                 |
| ---------- | ------------------- | ------------------------------- | ------------------------------------------------------ |
| background | 背景颜色            | `string`                        | `linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)` |
| onLogin    | 登录方法 会触发校验 | ({username, password}) => `any` |                                                        |
