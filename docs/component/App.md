---
title: 配置组件
order: 2
---

# App 配置组件

```jsx
import { App, Button } from 'yj-design-components'
import React from 'react'

const Index = () => {
  return (
    <App token={{ colorPrimary: '#52c41a' }}>
      <Button type="primary">主要</Button>
    </App>
  )
}

export default Index
```
