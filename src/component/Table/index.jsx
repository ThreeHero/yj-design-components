import React from 'react'
import { Table, Tooltip } from 'antd'

import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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

function Index(props) {
  // todo 拖拽
  const {
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
    ...rest
  } = props || {}

  const [list, setList] = React.useState([])

  React.useEffect(() => {
    async function getList() {
      const { list } = await request(initParams)
      setList(list)
    }
    getList()
  }, [initParams])

  // 整理列
  const c = React.useMemo(() => {
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
    return columns.map(item => ({ ...e, ...item, align }))
  }, [columns, align, seral, ellipsis])

  let table = (
    <Table
      style={{ userSelect: 'none', ...style }}
      {...rest}
      rowSelection={selectable}
      rowKey={rowKey}
      columns={c}
      dataSource={list}
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
            style={{ userSelect: 'none', ...style }}
            {...rest}
            rowSelection={selectable}
            rowKey={rowKey}
            columns={c}
            dataSource={list}
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
