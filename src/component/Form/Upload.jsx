import React, { useMemo } from 'react'
import { Upload as AntdUpload, message, Image, Row, Space } from 'antd'
import { Button } from '../..'
import { PlusOutlined } from '@ant-design/icons'

const Upload = props => {
  const {
    value,
    onChange,
    children,
    prefixPath = '',
    successCode = 200,
    successData = 'data',
    errorMessage = 'message',
    ...rest
  } = props || {}

  const change = ({ fileList }) => {
    let list = [...fileList]
    list = list
      .map(file => {
        const { name, response, uid } = file
        if (response) {
          if (response.code === successCode) {
            return {
              url: prefixPath + response[successData],
              uid,
              name
            }
          } else {
            message.error(response[errorMessage])
            return
          }
        } else {
          return file
        }
      })
      .filter(Boolean)

    onChange(list)
  }
  return (
    <AntdUpload
      fileList={value}
      onChange={change}
      {...rest}
    >
      {children || <Button.Upload>上传</Button.Upload>}
    </AntdUpload>
  )
}

// 上传图片组件
const UploadImg = props => {
  const { value, children, avatar = true, isCircle, ...rest } = props || {}

  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传JPG/PNG格式图片')
    }
    return isJpgOrPng
  }

  const type = isCircle ? 'picture-circle' : 'picture-card'

  const ctx =
    value && value[0] ? (
      <Image
        src={value[0].url}
        alt={value[0].alt}
        key={value[0].uid}
        preview={false}
        style={{
          width: '100%',
          borderRadius: isCircle ? '50%' : '8px'
        }}
      />
    ) : (
      <PlusOutlined />
    )

  const content = avatar ? ctx : <PlusOutlined />

  return (
    <Row>
      <Upload
        value={value}
        maxCount={avatar ? 1 : 0}
        {...rest}
        listType={type}
        beforeUpload={beforeUpload}
        showUploadList={!avatar}
      >
        {children || content}
      </Upload>
    </Row>
  )
}

export function initUpload(url, prefixPath = 'http://127.0.0.1:9000') {
  return [
    {
      uid: -1,
      name: 'img.png',
      url: prefixPath + url
    }
  ]
}

/**
 * 将url去掉特定的前缀
 * @param {string} url 整体的url
 * @param {string} prefixPath 需要去掉的前缀
 * @returns {string}
 */
export function getUrl(url, prefixPath = 'http://127.0.0.1:9000') {
  if (url.includes(prefixPath)) {
    return url.split(prefixPath)[1]
  }
  return url
}

Upload.Image = UploadImg
export default Upload
