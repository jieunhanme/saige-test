import { useMemo } from 'react'
import { Tag } from 'antd'
import dayjs from 'dayjs'

// 마감일이 4일 이상 남은 경우 태그를 표시하지 않음
const EXPIRED_DAYS = 4

type DeadlineTagProps = {
  currentDate: Date
  deadline: number
}

export function DeadlineTag({ currentDate, deadline }: DeadlineTagProps) {
  const tagLabel = useMemo(() => {
    const deadlineDate = dayjs(deadline)
    const diffDays = deadlineDate.diff(currentDate, 'day')

    if (diffDays === 0) {
      return '오늘'
    } else if (diffDays < 0) {
      return '만료됨'
    } else if (diffDays < EXPIRED_DAYS) {
      return `${diffDays}일 남음`
    } else if (diffDays >= EXPIRED_DAYS) {
      return null
    }
  }, [currentDate, deadline])

  return (
    <>
      {tagLabel != null && (
        <Tag color="magenta" style={{ marginRight: 0 }}>
          {tagLabel}
        </Tag>
      )}
    </>
  )
}
