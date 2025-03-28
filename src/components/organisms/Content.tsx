import { useCallback, useRef, useState } from 'react'
import { Space } from 'antd'

import { ToDo, ToDoRequest } from '../../types/api'
import { EmptyList } from '../atoms'
import { TodoList, TodoActionBar, TodoListRef } from '../organisms'

type ContentProps = {
  todos: ToDo[]
  currentDate: Date
  searchKeyword: string
  handleAddTodo: (newTodo: ToDoRequest) => Promise<void>
  handleUpdateTodo: ({
    id,
    update,
  }: {
    id: ToDo['id']
    update: ToDoRequest
  }) => Promise<void>
}

export function Content({
  todos,
  searchKeyword,
  currentDate,
  handleAddTodo,
  handleUpdateTodo,
}: ContentProps) {
  const [isRemoving, setIsRemoving] = useState<boolean>(false)
  const listRef = useRef<TodoListRef>(null)

  const handleSetIsRemoving = useCallback((value: boolean) => {
    if (value) {
      listRef.current?.setClear()
    } else {
      const selectedTodos = listRef.current?.getSelectedTodos()
      console.log('Content [selectedTodos]:: ', selectedTodos)
    }
    setIsRemoving(value)
  }, [])

  const filteredTodo = todos.filter((todo) => todo.text.includes(searchKeyword))

  const isEmpty = !todos.length || !filteredTodo.length

  return (
    <Space
      direction="vertical"
      size="small"
      style={{ display: 'flex' }}
      className="overflow-hidden"
    >
      <TodoActionBar
        isRemoving={isRemoving}
        currentDate={currentDate}
        handleAddTodo={handleAddTodo}
        handleSetIsRemoving={handleSetIsRemoving}
      />
      {isEmpty ? (
        <EmptyList description={!todos.length ? noTodo : noFilterdTodo} />
      ) : (
        <TodoList
          ref={listRef}
          todos={filteredTodo}
          isRemoving={isRemoving}
          currentDate={currentDate}
          handleUpdateTodo={handleUpdateTodo}
        />
      )}
    </Space>
  )
}

const noTodo = (
  <p>
    할 일이 없어요.
    <br />
    여유로운 하루를 즐겨보세요. 😊
  </p>
)
const noFilterdTodo = (
  <p>
    검색결과가 없어요.
    <br />
    다른 검색어로 진행해주세요. 😊
  </p>
)
