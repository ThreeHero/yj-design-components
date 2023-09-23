---
title: 布局
order: 2
---

# Layout 布局

## 基本使用

```jsx
/**
 * hideActions: ["CSB"]
 * iframe: true
 */
import { Layout } from 'yj-design-components'
import React from 'react'

const Index = () => {
  const slideMenu = React.useMemo(() => {
    return {
      onClick: v => console.log(v),
      items: [
        {
          label: 'Navigation One',
          key: 'mail'
        },
        {
          label: 'Navigation Two',
          key: 'phone'
        },
        {
          label: 'Navigation Three',
          key: 'user',
          children: [
            {
              label: 'Navigation Four',
              key: 'user1'
            },
            {
              label: 'Navigation Five',
              key: 'user2'
            }
          ]
        }
      ]
    }
  }, [])
  return (
    <Layout
      bgColor="#088"
      triggerPosition="header"
      slideMenu={slideMenu}
    >
      内容
    </Layout>
  )
}

export default Index
```

```jsx
/**
 * hideActions: ["CSB"]
 * iframe: 800
 */
import { Layout, Table, SearchBar, Button } from 'yj-design-components'
import { Space } from 'antd'
import React from 'react'

const Index = () => {
  const [initParams, setInitParams] = React.useState({})
  const changeParams = v => {
    setInitParams({ ...initParams, ...v })
  }
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
  const slideMenu = React.useMemo(() => {
    return {
      items: [
        {
          label: '表格',
          key: 'table'
        }
      ]
    }
  }, [])
  const saveItems = React.useMemo(() => {
    return {
      r: null,
      data: [
        {
          name: 'id',
          label: 'id',
          element: {
            type: 'input'
          }
        },
        {
          name: 'name',
          label: '姓名',
          element: {
            type: 'input'
          }
        }
      ]
    }
  }, [])

  const columns = React.useMemo(() => {
    return [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '操作',
        render: (t, r) => {
          return (
            <Space>
              <Button
                type="link"
                modal
                items={{
                  r,
                  data: [
                    {
                      name: 'id',
                      label: 'id',
                      element: {
                        type: 'input'
                      }
                    },
                    {
                      name: 'name',
                      label: '姓名',
                      element: {
                        type: 'input'
                      }
                    }
                  ]
                }}
              >
                编辑
              </Button>
              <Button
                confirm
                type="link"
                danger
              >
                删除
              </Button>
            </Space>
          )
        }
      }
    ]
  }, [])
  return (
    <Layout slideMenu={slideMenu}>
      <SearchBar
        items={[{ name: 'name', label: '姓名' }]}
        setInitParams={changeParams}
        extra={[
          <Button
            modal
            items={saveItems}
          >
            新增
          </Button>
        ]}
      />
      <Table
        request={request}
        rowKey="id"
        initParams={initParams}
        bordered
        draggable
        columns={columns}
      />
    </Layout>
  )
}

export default Index
```

## Api

| 参数               |              说明              |                类型                |  默认值  |
| :----------------- | :----------------------------: | :--------------------------------: | :------: |
| bgColor            |        头部和侧边背景色        |              `string`              |          |
| color              |         头部的文字颜色         |              `string`              |          |
| triggerPosition    |         折叠器触发未知         |        `header` \| `bottom`        | `header` |
| headerLeftContent  | 触发器为`bottom`时头部左侧内容 |            `ReactNode`             |          |
| headerRightContent |          头部右侧内容          |            `ReactNode`             |          |
| logo               |           logo 内容            | <a href="#logoProps">logoProps</a> |          |
| slideMenu          |            侧边菜单            | <a href="#menuProps">menuProps</a> |          |

<h3 id="logoProps">logoProps</h3>

| 参数     |        说明         |   类型   |     默认值     |
| :------- | :-----------------: | :------: | :------------: |
| complete | 完整的 logo(6 个字) | `string` | `后台管理系统` |
| ellipsis | 省略的 logo(2 个字) | `string` |     `后台`     |

<h3 id="menuProps">menuProps</h3>

| 参数    |   说明   |                                             类型                                              | 默认值 |
| :------ | :------: | :-------------------------------------------------------------------------------------------: | :----: |
| items   |  配置项  | <a href="https://ant-design.antgroup.com/components/menu-cn#MenuItemType">MenuItemProps[]</a> |        |
| onClick | 点击事件 |                          `({ item, key, keyPath, domEvent }) => any`                          |        |
