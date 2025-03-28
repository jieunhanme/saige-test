import { Checkbox, CheckboxChangeEvent, Space } from 'antd'
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react'

import { ToDo, ToDoRequest } from '../../types/api'
import { TodoCard } from '../organisms'

type TodoListProps = {
  todos: ToDo[]
  isRemoving: boolean
  currentDate: Date
  handleUpdateTodo: ({
    id,
    update,
  }: {
    id: ToDo['id']
    update: ToDoRequest
  }) => Promise<void>
}

type TodoId = ToDo['id']

export type TodoListRef = {
  getSelectedTodos: () => TodoId[]
  setClear: () => void
}

export const TodoList = forwardRef(function (
  { todos, isRemoving, currentDate, handleUpdateTodo }: TodoListProps,
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
      {todos.map((todo) => (
        <div key={todo.id} className="flex gap-2">
          {isRemoving && (
            <Checkbox
              onChange={(event) => handleCheckboxChange(event, todo.id)}
            />
          )}
          <TodoCard
            todo={todo}
            isRemoving={isRemoving}
            currentDate={currentDate}
            handleUpdateTodo={handleUpdateTodo}
          />
        </div>
      ))}
    </Space>
  )
})
