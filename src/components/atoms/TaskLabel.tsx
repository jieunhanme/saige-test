import { Typography } from 'antd'

type TaskLabelProps = {
  label: string
  color?: string
}

export function TaskLabel({ label, color }: TaskLabelProps) {
  return (
    <Typography.Paragraph
      style={{ margin: 0, fontSize: '16px', color: color ?? 'black' }}
      ellipsis={{
        rows: 1,
        tooltip: {
          title: label,
        },
      }}
    >
      {label}
    </Typography.Paragraph>
  )
}
