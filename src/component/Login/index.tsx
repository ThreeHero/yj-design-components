import React from 'react'
import styles from './style.module.less'
import Form from '../Form'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './style.less'
import type YJLoginProp from './LoginProps'
import { message } from 'antd'

const Index: React.FC<YJLoginProp> = props => {
  const { onLogin, background, style, className } = props || {}
  const [form] = Form.useForm()

  const login = async () => {
    try {
      const res = await form.validateFields()
      const { username, password } = res
      onLogin?.({ username, password })
    } catch {
      message.error('请填写用户名或密码')
    }
  }

  const items = [
    {
      name: 'username',
      rules: [{ required: true, message: '用户名不能为空' }],
      className: styles['login-form-item'],
      element: {
        type: 'input',
        className: styles['login-ipt'],
        onPressEnter: login,
        placeholder: '请输入用户名',
        bordered: false,
        prefix: <UserOutlined className="login-icon" />
      }
    },
    {
      name: 'password',
      rules: [{ required: true, message: '密码不能为空' }],
      className: styles['login-form-item'],
      element: {
        type: 'password',
        className: styles['login-ipt'],
        placeholder: '请输入密码',
        bordered: false,
        onPressEnter: login,
        prefix: <LockOutlined className="login-icon" />
      }
    },
    {
      noStyle: true,
      element: {
        type: 'button',
        className: styles['login-btn'],
        children: '登录',
        onClick: login
      }
    }
  ]
  return (
    <div
      className={`${styles.YJLoginPage} YJLoginPage`}
      style={{ background }}
    >
      <div
        className={`${styles.loginBox} ${className}`}
        style={style}
      >
        <Form
          items={items}
          form={form}
          limit={3}
          className={styles['login-form']}
        />
      </div>
    </div>
  )
}

export default Index
