import React from 'react'
import { Switch as AntdSwitch } from 'antd'

function Switch(props) {
  const { value, ...rest } = props || {}
  return (
    <AntdSwitch
      {...rest}
      checked={value}
    />
  )
}

export default Switch
