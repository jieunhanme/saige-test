import { Input, InputProps, InputRef } from 'antd'
import { forwardRef } from 'react'

interface TodoInputProps extends InputProps {}

export const TodoInput = forwardRef<InputRef, TodoInputProps>(
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
