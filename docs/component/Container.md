---
title: 布局
order: 2
---

# Container 布局

```jsx
/**
 * hideActions: ["CSB"]
 * iframe: true
 */
import { App, Container } from 'yj-design-components'
import React from 'react'

const Index = () => {
  return (
    <App token={{ colorPrimary: 'pink' }}>
      <Container
        headerBgColor={'skyblue'}
        isFixed
        isFooter={false}
        footerContent={'123'}
      >
        内容
      </Container>
    </App>
  )
}

export default Index
```
