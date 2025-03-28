import { useRef, useState } from 'react'
import { Space } from 'antd'

import { ToDo, ToDoRequest } from '../../types/api'
import { TaskList, TaskActionBar, TaskListRef } from '../organisms'
import { EmptyList } from '../atoms'

type ContentProps = {
  currentDate: Date
  searchKeyword: string
}

export function Content({ searchKeyword, currentDate }: ContentProps) {
  const [todos, setTodos] = useState<ToDo[]>([])
  const [isRemoving, setIsRemoving] = useState<boolean>(false)
  const listRef = useRef<TaskListRef>(null)

  const handleSetIsRemoving = (value: boolean) => {
    if (value) {
      listRef.current?.setClear()
    } else {
      const selectedTodos = listRef.current?.getSelectedTodos()
      console.log('Content [selectedTodos]:: ', selectedTodos)
    }
    setIsRemoving(value)
  }

  const handleAddTask = (values: ToDoRequest) => {
    setTodos((todos) => [...todos, { ...values, id: 1 }])
  }

  const filteredTask = todos.filter((todo) => todo.text.includes(searchKeyword))

  const isEmpty = !todos.length || !filteredTask.length

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
      {isEmpty ? (
        <EmptyList description={!todos.length ? noTask : noFilterdTask} />
      ) : (
        <TaskList
          ref={listRef}
          todos={filteredTask}
          isRemoving={isRemoving}
          currentDate={currentDate}
        />
      )}
    </Space>
  )
}

const noTask = (
  <p>
    할 일이 없어요.
    <br />
    여유로운 하루를 즐겨보세요. 😊
  </p>
)
const noFilterdTask = (
  <p>
    검색결과가 없어요.
    <br />
    다른 검색어로 진행해주세요. 😊
  </p>
)
