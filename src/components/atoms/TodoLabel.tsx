import { Typography } from 'antd'

type TodoLabelProps = {
  label: string
  color?: string
}

export function TodoLabel({ label, color }: TodoLabelProps) {
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
