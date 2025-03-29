import { useCallback, useEffect, useState } from 'react'
import { ConfigProvider } from 'antd'

import { createTodo, getTodos, removeTodo, updateTodo } from './api'
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
    try {
      const { data } = await createTodo(newTodo)
      if (!data) return
      setTodos((prev) => [...prev, data])
    } catch (error) {
      console.log(error)
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

  const handleUpdateTodo = useCallback(
    async ({ id, update }: { id: ToDo['id']; update: ToDoRequest }) => {
      const originalTodo = todos.find((todo) => todo.id === id)
      if (!originalTodo) return

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { id, ...update } : todo))
      )
      try {
        await updateTodo({ id, todo: update })
      } catch (error) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? originalTodo : todo))
        )
      }
    },
    [todos]
  )

  const handleRemoveTodo = useCallback(
    async (ids: ToDo['id'][]) => {
      const backupTodos = new Map(todos.map((todo) => [todo.id, todo]))
      setTodos((prev) => prev.filter((todo) => !ids.includes(todo.id)))

      const removeRequests = ids.map(async (id) => {
        try {
          await removeTodo(id)
          return null
        } catch (error) {
          return id
        }
      })

      const results = await Promise.allSettled(removeRequests)
      const rejectedIds = results.filter(
        (result) => result.status === 'fulfilled' && result.value !== null
      ) as PromiseFulfilledResult<number>[]

      if (rejectedIds.length > 0) {
        setTodos((prev) => [
          ...prev,
          ...rejectedIds.map(({ value }) => backupTodos.get(value)!),
        ])
      }
    },
    [todos]
  )

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
        handleUpdateTodo={handleUpdateTodo}
        handleRemoveTodo={handleRemoveTodo}
      />
    </ConfigProvider>
  )
}

export default App
