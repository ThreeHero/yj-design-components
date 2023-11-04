import { Table, Tooltip } from 'antd'
import React, { useState, useEffect, useMemo } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { formatDate } from '../utils/tools'
import type YJTableProps from './TableProps'

const Row = props => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key']
  })
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1
      }
    ),
    transition,
    cursor: 'move',
    ...(isDragging
      ? {
        position: 'relative',
        zIndex: 9999
      }
      : {})
  }
  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  )
}

const Index: React.FC<YJTableProps> = (props) => {
  const {
    bordered = true,
    columns = [],
    request,
    seral,
    rowKey = 'id',
    align = 'center',
    selectable,
    initParams,
    ellipsis = true,
    draggable,
    style = {},
    onPageChange = () => { },
    ...rest
  } = props || {}

  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  // 请求参数
  const requestParams = useMemo(() => {
    return {
      page: 1,
      pageSize: 10,
      ...(initParams || {})
    }
  }, [initParams])

  // 初始请求数据
  useEffect(() => {
    async function getList() {
      setLoading(true)
      try {
        const { list: l, total: t } = (await request(requestParams)) || {}
        setList(l)
        setTotal(t)
      } finally {
        setLoading(false)
      }
    }
    getList()
  }, [requestParams])

  // 整理列
  const c = useMemo(() => {
    // 序号列
    if (seral) {
      columns.unshift({
        title: seral.title ?? '序号',
        width: seral.width ?? 100,
        render(t, r, i) {
          return (
            <Tooltip
              placement="topLeft"
              title={i + 1}
            >
              {i + 1}
            </Tooltip>
          )
        }
      })
    }
    // 超出隐藏
    const e = ellipsis
      ? {
        ellipsis: {
          showTitle: false
        },
        render(t) {
          return (
            <Tooltip
              placement="topLeft"
              title={t}
            >
              {t}
            </Tooltip>
          )
        }
      }
      : {}
    // 操作列
    return columns.map(item => {
      let r = {}

      if (item.formatDate) {
        const format = typeof item.formatDate === 'string' ? item.formatDate : (void 0 as any)
          (r as any).render = t => (
            <Tooltip
              placement="topLeft"
              title={formatDate(t, format)}
            >
              {formatDate(t, format)}
            </Tooltip>
          )
      }
      return {
        ...e,
        ...item,
        align,
        title: item.title || item.label || item.text,
        dataIndex: item.dataIndex || item.name || item.value,
        ...r
      }
    })
  }, [columns, align, seral, ellipsis])

  let table = (
    <Table
      bordered={bordered}
      style={{ userSelect: 'none', ...style }}
      pagination={{
        current: requestParams.page,
        pageSize: requestParams.pageSize,
        total,
        showSizeChanger: true,
        pageSizeOptions: [
          requestParams.pageSize * 1,
          requestParams.pageSize * 2,
          requestParams.pageSize * 3,
          requestParams.pageSize * 4
        ],
        showTotal: total => `共 ${total} 条`,
        onChange: (page, pageSize) => {
          onPageChange?.({ ...requestParams, page, pageSize })
        }
      }}
      {...rest}
      rowSelection={selectable}
      rowKey={rowKey}
      columns={c}
      dataSource={list}
      loading={loading}
    />
  )

  if (draggable) {
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 1
        }
      })
    )
    const onDragEnd = ({ active, over }) => {
      if (active.id !== over?.id) {
        setList(prev => {
          const activeIndex = prev.findIndex(i => i[rowKey] === active.id)
          const overIndex = prev.findIndex(i => i[rowKey] === over?.id)
          return arrayMove(prev, activeIndex, overIndex)
        })
      }
    }
    table = (
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          // rowKey array
          items={list.map(i => i[rowKey])}
          strategy={verticalListSortingStrategy}
        >
          <Table
            bordered={bordered}
            style={{ userSelect: 'none', ...style }}
            {...rest}
            rowSelection={selectable}
            pagination={false}
            rowKey={rowKey}
            columns={c}
            dataSource={list}
            loading={loading}
            components={{
              body: {
                row: Row
              }
            }}
          />
        </SortableContext>
      </DndContext>
    )
  }
  return table
}

export default Index
