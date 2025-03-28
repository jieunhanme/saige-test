import { Empty } from 'antd'

export function EmptyList() {
  return (
    <Empty
      className="h-[600px] !m-0 py-16"
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <p>
          할 일이 없어요.
          <br />
          여유로운 하루를 즐겨보세요 😊
        </p>
      }
    />
  )
}
