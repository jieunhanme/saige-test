import { useLayoutEffect, useRef } from 'react'
import { Checkbox, Form, FormProps, Input, InputRef } from 'antd'
import dayjs from 'dayjs'

import { DeadlinePicker, TodoInput } from '../atoms'
import { ToDo, ToDoRequest } from '../../types/api'
import { useClickOutside } from '../../hooks'

type TodoFormProps = {
  todo?: ToDo
  currentDate?: Date
  handleSubmit?: (values: ToDoRequest) => void
  handleCancelSubmit?: () => void
}

export function TodoForm({
  todo,
  currentDate,
  handleSubmit,
  handleCancelSubmit,
}: TodoFormProps) {
  const [form] = Form.useForm()
  const inputRef = useRef<InputRef>(null)
  const ref = useClickOutside(() => form.submit())

  useLayoutEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handelFinish: FormProps<ToDoRequest>['onFinish'] = (values) =>
    handleSubmit?.(values)

  const handleFinishFailed: FormProps['onFinishFailed'] = () =>
    handleCancelSubmit?.()

  const handleKeyPress: FormProps['onKeyDown'] = (event) => {
    if (event.key === 'Enter') {
      form.submit()
    }
  }

  return (
    <div ref={ref}>
      <Form<ToDoRequest>
        form={form}
        size="large"
        variant="underlined"
        initialValues={todo ?? { deadline: new Date().valueOf(), done: false }}
        onFinish={handelFinish}
        onFinishFailed={handleFinishFailed}
        onKeyDown={handleKeyPress}
      >
        <Form.Item
          name="text"
          rules={[{ required: true, message: '' }]}
          style={{
            display: 'inline-block',
            width: 'calc(100% - 140px - 8px)',
            marginBottom: 0,
          }}
        >
          <TodoInput ref={inputRef} />
        </Form.Item>
        <Form.Item
          name="deadline"
          rules={[{ required: true, message: '' }]}
          style={{
            display: 'inline-block',
            width: '140px',
            margin: '0 0 0 8px',
          }}
          getValueProps={(value) => ({ value: value && dayjs(Number(value)) })}
          normalize={(value) => value && dayjs(value).valueOf()}
        >
          <DeadlinePicker minDate={dayjs(currentDate)} />
        </Form.Item>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="done" valuePropName="checked" hidden>
          <Checkbox />
        </Form.Item>
      </Form>
    </div>
  )
}
