import { useCallback, useEffect, useState } from 'react'
import { ConfigProvider } from 'antd'

import { createTodo, getTodos } from './api'
import { ToDo, ToDoRequest } from './types/api'
import { useCurrentDate, useLocalStorage } from './hooks'
import { Todo } from './components/templates'
import './App.css'

function App() {
  const [todos, setTodos] = useState<ToDo[]>([])

  const currentDate = useCurrentDate()
  const [storedValue, setStoredValue] = useLocalStorage<string>('keyword', '')

  const handleSetSearchKeyword = useCallback(
    (keyword: string) => {
      setStoredValue(keyword)
    },
    [setStoredValue]
  )

  const handleAddTodo = useCallback(async (newTodo: ToDoRequest) => {
    const tempId = Date.now()
    setTodos((prev) => [...prev, { ...newTodo, id: tempId }])
    try {
      const { data } = await createTodo(newTodo)
      if (!data) return
      setTodos((prev) => prev.map((todo) => (todo.id === tempId ? data : todo)))
    } catch (error) {
      setTodos((prev) => prev.filter((item) => item.id !== tempId))
    }
  }, [])

  const handleGetTodos = useCallback(async () => {
    try {
      const { data } = await getTodos()
      if (!data) return
      setTodos(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    handleGetTodos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF4052',
          borderRadius: 8,
          fontFamily: 'MinSans',
        },
      }}
    >
      <Todo
        todos={todos}
        currentDate={currentDate}
        searchKeyword={storedValue}
        handleSetSearchKeyword={handleSetSearchKeyword}
        handleAddTodo={handleAddTodo}
      />
    </ConfigProvider>
  )
}

export default App
