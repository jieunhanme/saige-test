import { useState } from 'react'
import { Card, Checkbox, CheckboxProps } from 'antd'

import { DeadlineTag, FormattedDate, TodoLabel } from '../atoms'
import { TodoForm } from '../molecules'
import { ToDo, ToDoRequest } from '../../types/api'

type TodoCardType = {
  todo: ToDo
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

export function TodoCard({
  todo,
  isRemoving,
  currentDate,
  handleUpdateTodo,
}: TodoCardType) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { id, text, deadline, done } = todo

  const handleClickCard = () => !isRemoving && !done && setIsEditing(true)

  const handleSubmit = (values: ToDoRequest) => {
    setIsEditing(false)
    handleUpdateTodo({ id, update: values })
  }

  const handleCancelSubmit = () => {
    setIsEditing(false)
  }

  const handleCheckboxChange: CheckboxProps['onChange'] = (event) => {
    if (isRemoving) return
    const checked = event.target.checked
    const { id, ...rest } = todo
    handleUpdateTodo({ id, update: { ...rest, done: checked } })
  }

  return (
    <>
      {isEditing ? (
        <Card
          styles={{
            body: { height: 60, padding: '10px 20px 8px 20px' },
          }}
          className="flex-1"
          variant="borderless"
          hoverable
        >
          <TodoForm
            todo={todo}
            handleSubmit={handleSubmit}
            handleCancelSubmit={handleCancelSubmit}
          />
        </Card>
      ) : (
        <Card
          styles={{
            body: {
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              height: 60,
              padding: 8,
              backgroundColor: isRemoving ? '#f1f1f16e' : '',
              cursor: isRemoving ? 'default' : '',
            },
          }}
          variant="borderless"
          className={`${done && 'strike'} flex-1 overflow-hidden`}
          onClick={handleClickCard}
          hoverable
        >
          <div className="flex grow items-center gap-2 overflow-hidden">
            <Checkbox
              checked={done}
              onChange={handleCheckboxChange}
              onClick={(event) => event.stopPropagation()}
              disabled={isRemoving}
            />
            <TodoLabel
              label={text}
              color={done ? 'var(--color-saige-grey)' : ''}
            />
          </div>
          <div className="min-w-20 flex flex-col items-end gap-0.5 justify-end">
            {!done && (
              <DeadlineTag currentDate={currentDate} deadline={deadline} />
            )}
            <FormattedDate
              date={new Date(deadline)}
              className="text-xs text-saige-grey"
            />
          </div>
        </Card>
      )}
    </>
  )
}
