import { useState } from 'react'
import { Col, Row } from 'antd'

import { AddButton, RemoveButton } from '../atoms'
import { TaskForm } from '../molecules'
import { ToDoRequest } from '../../types/api'

type TaskActionBarProps = {
  currentDate: Date
  handleAddTask: (values: ToDoRequest) => void
}

  currentDate,
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [isRemoving, setIsRemoving] = useState<boolean>(false)

  const handleClickAdd = () => {
    setIsAdding(true)
    setIsRemoving(false)
  }

  const handleClickRemove = () => setIsRemoving((flag) => !flag)

  const handleSubmit = (values: ToDoRequest) => {
    handleAddTask(values)
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
        <TaskForm
          currentDate={currentDate}
          handleSubmit={handleSubmit}
          handleCancelSubmit={handleCancelSubmit}
        />
      )}
    </section>
  )
}
