import { Space } from 'antd'
import { FormattedDate, TaskSearchInput } from '../atoms'

const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

type HeaderProps = {
  currentDate: Date
  searchKeyword: string
  handleSetSearchKeyword: (keyword: string) => void
}

export function Header({
  currentDate,
  searchKeyword,
  handleSetSearchKeyword,
}: HeaderProps) {
  return (
    <Space
      direction="vertical"
      size="small"
      style={{ display: 'flex' }}
      className="border-b border-b-saige-light-grey p-4"
    >
      <FormattedDate
        date={currentDate}
        options={options}
        className="text-xl font-extrabold text-saige-black"
      />
      <TaskSearchInput
        searchKeyword={searchKeyword}
        handleSetSearchKeyword={handleSetSearchKeyword}
      />
    </Space>
  )
}
