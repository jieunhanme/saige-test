import { useState } from 'react'
import { Card, Checkbox, CheckboxProps } from 'antd'

import { DeadlineTag, FormattedDate, TaskLabel } from '../atoms'
import { TaskForm } from '../molecules'
import { ToDo, ToDoRequest } from '../../types/api'

type TaskCardType = {
  todo: ToDo
  isRemoving: boolean
  currentDate: Date
}
export function TaskCard({ todo, isRemoving, currentDate }: TaskCardType) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { text, deadline, done } = todo
  const [isChecked, setIsChecked] = useState<boolean>(done)

  const handleClickCard = () => !isRemoving && !isChecked && setIsEditing(true)

  const handleSubmit = (values: ToDoRequest) => {
    // TODO 콜백 제공 예정
    console.log('TaskItemCard [values]:: ', values)
    setIsEditing(false)
  }

  const handleCancelSubmit = () => {
    setIsEditing(false)
  }

  const handleCheckboxChange: CheckboxProps['onChange'] = (event) => {
    // TODO 콜백 제공 예정
    if (isRemoving) return
    const checked = event.target.checked
    setIsChecked(checked)
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
          <TaskForm
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
            },
          }}
          variant="borderless"
          className={`${isChecked && 'strike'} flex-1`}
          onClick={handleClickCard}
          hoverable
        >
          <div className="flex grow items-center gap-2 overflow-hidden">
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              onClick={(event) => event.stopPropagation()}
            />
            <TaskLabel
              label={text}
              color={isChecked ? 'var(--color-saige-grey)' : ''}
            />
          </div>
          <div className="min-w-20 flex flex-col items-end gap-0.5 justify-end">
            {!isChecked && (
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
