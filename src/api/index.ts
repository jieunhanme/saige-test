import { APIResponse, ToDo, ToDoRequest } from '../types/api'

const baseUrl = '/api/todos'

type TodoId = ToDo['id']

export const createTodo = async (
  todo: ToDoRequest
): Promise<APIResponse<ToDo>> => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(todo),
  })
  const data = errorHandler('createTodo', response)

  return data
}

export const getTodos = async (): Promise<APIResponse<ToDo[]>> => {
  const response = await fetch(baseUrl, {
    method: 'GET',
  })
  const data = errorHandler('getTodos', response)

  return data
}

export const updateTodo = async ({
  id,
  todo,
}: {
  id: TodoId
  todo: ToDoRequest
}): Promise<APIResponse<ToDo>> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(todo),
  })
  const data = errorHandler('updateTodo', response)

  return data
}

export const removeTodo = async (id: TodoId): Promise<APIResponse<void>> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  })
  const data = errorHandler('removeTodo', response)

  return data
}

async function errorHandler(key: string, response: Response) {
  if (!response.ok) {
    throw new Error(`HTTP error! [${key}]: ${response.status}`)
  }

  const data = await response.json()
  if (data.code !== 200) {
    console.error(`HTTP error! [${key}]: ${data.message}`)
    throw new Error(`HTTP error! [${key}]: ${data.code}, ${data.message}`)
  }

  return data
}
