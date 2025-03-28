import { useState } from 'react'
import { Col, Row } from 'antd'

import { AddButton, RemoveButton } from '../atoms'
import { TodoForm } from '../molecules'
import { ToDoRequest } from '../../types/api'

type TodoActionBarProps = {
  isRemoving: boolean
  currentDate: Date
  handleAddTodo: (values: ToDoRequest) => Promise<void>
  handleSetIsRemoving: (value: boolean) => void
}

export function TodoActionBar({
  isRemoving,
  currentDate,
  handleAddTodo,
  handleSetIsRemoving,
}: TodoActionBarProps) {
  const [isAdding, setIsAdding] = useState<boolean>(false)

  const handleClickAdd = () => {
    setIsAdding(true)
    handleSetIsRemoving(false)
  }

  const handleClickRemove = () => handleSetIsRemoving(!isRemoving)

  const handleSubmit = (values: ToDoRequest) => {
    handleAddTodo(values)
    setIsAdding(false)
  }
  const handleCancelSubmit = () => {
    setIsAdding(false)
  }

  return (
    <section className="pt-4 px-4">
      {!isAdding ? (
        <Row gutter={8}>
          <Col flex="auto">
            <AddButton onClick={handleClickAdd} />
          </Col>
          <Col>
            <RemoveButton isRemoving={isRemoving} onClick={handleClickRemove} />
          </Col>
        </Row>
      ) : (
        <TodoForm
          currentDate={currentDate}
          handleSubmit={handleSubmit}
          handleCancelSubmit={handleCancelSubmit}
        />
      )}
    </section>
  )
}
