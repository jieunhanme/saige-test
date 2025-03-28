import { Checkbox, CheckboxChangeEvent, Space } from 'antd'
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react'

import { ToDo } from '../../types/api'
import { TodoCard } from '../organisms'

type TodoListProps = {
  todos: ToDo[]
  isRemoving: boolean
  currentDate: Date
}

type TodoId = ToDo['id']

export type TodoListRef = {
  getSelectedTodos: () => TodoId[]
  setClear: () => void
}

export const TodoList = forwardRef(function (
  { todos, isRemoving, currentDate }: TodoListProps,
  ref: ForwardedRef<TodoListRef>
) {
  const [selectedTodos, setSelectedTodos] = useState<TodoId[]>([])

  const handleCheckboxChange = (event: CheckboxChangeEvent, id: TodoId) => {
    const checked = event.target.checked
    if (checked) setSelectedTodos((selected) => [...selected, id])
    else
      setSelectedTodos((selected) => selected.filter((todoId) => todoId !== id))
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
          <TodoCard
            todo={todo}
            isRemoving={isRemoving}
            currentDate={currentDate}
          />
        </div>
      ))}
    </Space>
  )
})
