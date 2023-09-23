---
title: 介绍
order: 1
---

# 介绍

通过此教程，让我们一步一步开始使用吧。

## 一、安装 `yj-design-components`

### 前置安装

`yj-design-components` 依赖于 [Ant Design V5](https://ant-design.antgroup.com/components/overview-cn) ，请预先安装好。

npm

```shell
npm install antd@5 @ant-design/icons --save
```

或 yarn

```shell
yarn add antd@5 @ant-design/icons
```

### 开始安装

npm

```shell
npm install yj-design-components --save
```

或 yarn `(推荐使用)`

```shell
yarn add yj-design-components
```

## 二、使用 `yj-design-components`

```jsx
/**
 * hideActions: ["CSB"]
 */
import { Button } from 'yj-design-components'
import React from 'react'
export default () => <Button confirm>yj-design-components</Button>
```

🎉 恭喜您，成功安装了 `yj-design-components`，请继续阅读 [布局](/component/layout)。
