import { Input } from 'antd'
import { SearchProps } from 'antd/es/input'
import { useEffect, useState } from 'react'

const { Search } = Input

type TodoSearchInput = {
  searchKeyword: string
  handleSetSearchKeyword: (keyword: string) => void
}

export function TodoSearchInput({
  searchKeyword,
  handleSetSearchKeyword,
}: TodoSearchInput) {
  const [searchValue, setSearchValue] = useState(searchKeyword)

  useEffect(() => {
    setSearchValue(searchKeyword)
  }, [searchKeyword])

  const handleChange: SearchProps['onChange'] = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSearch: SearchProps['onSearch'] = (value) =>
    handleSetSearchKeyword(value)

  return (
    <Search
      placeholder="키워드 검색"
      variant="filled"
      size="large"
      value={searchValue}
      onChange={handleChange}
      onSearch={handleSearch}
      autoComplete="off"
      allowClear
    />
  )
}
