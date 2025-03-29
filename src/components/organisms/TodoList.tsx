import { Checkbox, CheckboxChangeEvent, Space } from 'antd'
import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

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

const ITEMS_PER_PAGE = 10

export const TodoList = forwardRef(function (
  { todos, isRemoving, currentDate, handleUpdateTodo }: TodoListProps,
  ref: ForwardedRef<TodoListRef>
) {
  const [selectedTodos, setSelectedTodos] = useState<TodoId[]>([])
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [hasMore, setHasMore] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    getSelectedTodos: () => selectedTodos,
    setClear: () => setSelectedTodos([]),
  }))

  const handleCheckboxChange = (event: CheckboxChangeEvent, id: TodoId) => {
    const checked = event.target.checked
    if (checked) setSelectedTodos((selected) => [...selected, id])
    else
      setSelectedTodos((selected) => selected.filter((todoId) => todoId !== id))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (target && isIntersecting) {
        setVisibleCount((prev) => {
          const newCount = prev + ITEMS_PER_PAGE
          if (newCount >= todos.length) {
            setHasMore(false)
            return todos.length
          }
          return newCount
        })
      }
    })
  })

  useEffect(() => {
    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => observer.disconnect()
  }, [todos, observer])

  const visibleTodos = useMemo(
    () => todos.slice(0, visibleCount),
    [todos, visibleCount]
  )
  return (
    <Space
      direction="vertical"
      size="small"
      style={{ display: 'flex' }}
      className="h-[600px] overflow-y-auto p-4 pb-2"
    >
      {visibleTodos.map((todo) => (
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
      <div ref={targetRef} />
      {visibleCount > ITEMS_PER_PAGE && !hasMore && (
        <div className="flex justify-center text-sm pb-2 text-[#00000073]">
          모든 할 일을 가져왔어요! 🎉
        </div>
      )}
    </Space>
  )
})
