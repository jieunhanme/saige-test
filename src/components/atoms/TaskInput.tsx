import { Input, InputProps, InputRef } from 'antd'
import { forwardRef } from 'react'

interface TaskInputProps extends InputProps {}

export const TaskInput = forwardRef<InputRef, TaskInputProps>(
  ({ value, onChange, ...props }, ref) => {
    return (
      <Input
        placeholder="할 일"
        ref={ref}
        {...props}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    )
  }
)
