import { Input } from 'antd'
import { SearchProps } from 'antd/es/input'

const { Search } = Input

type TaskSearchInput = {
  searchKeyword: string
  handleSetSearchKeyword: (keyword: string) => void
}

export function TaskSearchInput({
  searchKeyword,
  handleSetSearchKeyword,
}: TaskSearchInput) {
  const handleSearch: SearchProps['onSearch'] = (value) =>
    handleSetSearchKeyword(value)

  return (
    <Search
      placeholder="키워드 검색"
      variant="filled"
      size="large"
      defaultValue={searchKeyword}
      onSearch={handleSearch}
      autoComplete="off"
      allowClear
    />
  )
}
