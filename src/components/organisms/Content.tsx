import { useRef, useState } from 'react'
import { Space } from 'antd'

import { ToDo, ToDoRequest } from '../../types/api'
import { TaskList, TaskActionBar, TaskListRef } from '../organisms'
import { EmptyList } from '../atoms'

type ContentProps = {
  currentDate: Date
}

export function Content({ currentDate }: ContentProps) {
  const [todos, setTodos] = useState<ToDo[]>([])
  const [isRemoving, setIsRemoving] = useState<boolean>(false)
  const listRef = useRef<TaskListRef>(null)

  const handleSetIsRemoving = (value: boolean) => {
    console.log(value)
    if (value) {
      listRef.current?.setClear()
    } else {
      // 삭제할 todos 가져오기
      const selectedTodos = listRef.current?.getSelectedTodos()
      console.log('Content [selectedTodos]:: ', selectedTodos)
    }
    setIsRemoving(value)
  }

  const handleAddTask = (values: ToDoRequest) => {
    setTodos((todos) => [...todos, { ...values, id: 1 }])
  }

  return (
    <Space
      direction="vertical"
      size="small"
      style={{ display: 'flex' }}
      className="overflow-hidden"
    >
      <TaskActionBar
        isRemoving={isRemoving}
        currentDate={currentDate}
        handleAddTask={handleAddTask}
        handleSetIsRemoving={handleSetIsRemoving}
      />
      {!todos.length ? (
        <EmptyList />
      ) : (
        <TaskList
          ref={listRef}
          todos={todos}
          isRemoving={isRemoving}
          currentDate={currentDate}
        />
      )}
    </Space>
  )
}
