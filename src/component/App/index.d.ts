import { ConfigProviderProps } from 'antd/es/config-provider'

export default interface YJAppProps extends ConfigProviderProps {
  // 定制主题
  token: object

  // 默认中文语言包
  language: object
}
