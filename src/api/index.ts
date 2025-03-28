import { APIResponse, ToDo, ToDoRequest } from '../types/api'

const baseUrl = '/api/todos'

export const createTodo = async (
  todo: ToDoRequest
): Promise<APIResponse<ToDo>> => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    throw new Error(`HTTP error! [createTodo]: ${response.status}`)
  }
  return response.json()
}

export const getTodos = async (): Promise<APIResponse<ToDo[]>> => {
  const response = await fetch(baseUrl, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! [getTodos]: ${response.status}`)
  }
  return response.json()
}
