import { Checkbox, CheckboxChangeEvent, Space } from 'antd'
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react'

import { ToDo } from '../../types/api'
import { TaskCard } from '../organisms'

type TaskListProps = {
  todos: ToDo[]
  isRemoving: boolean
  currentDate: Date
}

type TaskId = ToDo['id']

export type TaskListRef = {
  getSelectedTodos: () => TaskId[]
  setClear: () => void
}

export const TaskList = forwardRef(function (
  { todos, isRemoving, currentDate }: TaskListProps,
  ref: ForwardedRef<TaskListRef>
) {
  const [selectedTodos, setSelectedTodos] = useState<TaskId[]>([])

  const handleCheckboxChange = (event: CheckboxChangeEvent, id: TaskId) => {
    const checked = event.target.checked
    if (checked) setSelectedTodos((selected) => [...selected, id])
    else
      setSelectedTodos((selected) => selected.filter((taskId) => taskId !== id))
  }

  useImperativeHandle(ref, () => ({
    getSelectedTodos: () => selectedTodos,
    setClear: () => setSelectedTodos([]),
  }))

  return (
    <Space
      direction="vertical"
      size="small"
      style={{ display: 'flex' }}
      className="h-[600px] overflow-y-auto p-4"
    >
      {todos.map((todo, index) => (
        // NOTE 연동 이후 key 변경 예정
        <div key={index} className="flex gap-2">
          {isRemoving && (
            <Checkbox
              onChange={(event) => handleCheckboxChange(event, todo.id)}
            />
          )}
          <TaskCard
            todo={todo}
            isRemoving={isRemoving}
            currentDate={currentDate}
          />
        </div>
      ))}
    </Space>
  )
})
