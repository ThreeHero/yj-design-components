import React from 'react'
import Button from './index'
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UploadOutlined
} from '@ant-design/icons'

export const Add: React.FC = props => {
  return (
    <Button
      {...props}
      icon={<PlusOutlined />}
    />
  )
}

export const Delete: React.FC = props => {
  return (
    <Button
      {...props}
      icon={<DeleteOutlined />}
    />
  )
}

export const Edit: React.FC = props => {
  return (
    <Button
      {...props}
      icon={<EditOutlined />}
    />
  )
}

export const Search: React.FC = props => {
  return (
    <Button
      {...props}
      icon={<SearchOutlined />}
    />
  )
}

export const Reload: React.FC = props => {
  return (
    <Button
      {...props}
      icon={<ReloadOutlined />}
    />
  )
}

export const Upload: React.FC = props => {
  return (
    <Button
      {...props}
      icon={<UploadOutlined />}
    />
  )
}

export const Download: React.FC = props => {
  return (
    <Button
      {...props}
      icon={<DownloadOutlined />}
    />
  )
}
