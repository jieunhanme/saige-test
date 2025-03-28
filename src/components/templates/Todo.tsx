import { ToDo, ToDoRequest } from '../../types/api'
import { Content, Header } from '../organisms'

type TodoProps = {
  todos: ToDo[]
  currentDate: Date
  searchKeyword: string
  handleSetSearchKeyword: (keyword: string) => void
  handleAddTodo: (newTodo: ToDoRequest) => void
}

export function Todo({
  todos,
  currentDate,
  searchKeyword,
  handleSetSearchKeyword,
  handleAddTodo,
}: TodoProps) {
  return (
    <section className="rounded border-saige-light-grey w-1/3 min-w-[500px] bg-white">
      <Header
        currentDate={currentDate}
        searchKeyword={searchKeyword}
        handleSetSearchKeyword={handleSetSearchKeyword}
      />
      <Content
        todos={todos}
        currentDate={currentDate}
        searchKeyword={searchKeyword}
        handleAddTodo={handleAddTodo}
      />
    </section>
  )
}
