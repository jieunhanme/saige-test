import { Empty } from 'antd'
import { ReactNode } from 'react'

type EmptyListProps = {
  description: ReactNode
}

export function EmptyList({ description }: EmptyListProps) {
  return (
    <Empty
      className="h-[600px] !m-0 py-16"
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={description}
    />
  )
}
