export default interface YJLoginProp {
  background?: string
  onLogin: ({ username, password }) => void
  style?: any
  className: any
}
