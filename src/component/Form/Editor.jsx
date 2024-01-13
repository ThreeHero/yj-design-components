import React, { useState, useEffect, useRef } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor as WangEditor, Toolbar } from '@wangeditor/editor-for-react'
import { editorToolKeys } from './toolbarKeys'

const Editor = props => {
  const {
    value,
    onChange,
    toolbarKeys, // 工具条
    readOnly, // 是否只读
    placeholder,
    height = 300,
    style = {},
    barStyle = {},
    contentStyle = {},
    editConfig = {},
    className
  } = props || {}

  const [editor, setEditor] = useState(null)

  // const isFirst = useRef(false)
  const toolbarConfig = {
    toolbarKeys: toolbarKeys || [
      'headerSelect',
      {
        key: 'group-code-style',
        title: '代码',
        menuKeys: ['blockquote', 'code', 'codeBlock']
      },
      '|',
      'bold',
      'italic',
      'through',
      'underline',
      '|',
      'color',
      'bgColor',
      {
        key: 'group-text-style',
        title: '文字',
        menuKeys: ['fontSize', 'fontFamily', 'lineHeight']
      },
      '|',
      {
        key: 'group-indent-style',
        title: '缩进',
        menuKeys: ['indent', 'delIndent']
      },
      {
        key: 'group-justify-style',
        title: '对齐',
        menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify']
      },
      '|',
      'todo',
      'undo',
      'redo',
      'fullScreen',
      '|',
      {
        key: 'group-table-style',
        title: '表格',
        menuKeys: [
          'insertTable',
          'deleteTable',
          'insertTableRow',
          'deleteTableRow',
          'insertTableCol',
          'deleteTableCol',
          'tableHeader',
          'tableFullWidth'
        ]
      },
      {
        key: 'group-list-style',
        title: '列表',
        menuKeys: ['bulletedList', 'numberedList']
      },
      'uploadImage',
      'emotion',
      'clearStyle'
    ]
  }

  const editorConfig = {
    placeholder: placeholder || '请输入内容...',
    readOnly: readOnly,
    ...editConfig
  }

  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <div
      style={{ border: '1px solid #ccc', ...style }}
      className={className}
    >
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #ccc', ...barStyle }}
      />
      <WangEditor
        defaultConfig={editorConfig}
        value={value}
        onCreated={setEditor}
        onChange={editor => {
          if (editor.getHtml() === '<p><br></p>') onChange(undefined) // 默认赋空
          else onChange(editor.getHtml())
        }}
        mode="default"
        style={{ height, ...contentStyle }}
      />
    </div>
  )
}

const Show = props => {
  return (
    <Editor
      {...props}
      barStyle={{ borderBottom: 'none' }}
      toolbarKeys={[]}
      readOnly
    />
  )
}

Editor.editorToolKeys = editorToolKeys
Editor.Show = Show
export default Editor
