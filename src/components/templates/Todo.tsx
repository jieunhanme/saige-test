import { Content, Header } from '../organisms'

type TodoProps = {
  currentDate: Date
  searchKeyword: string
  handleSetSearchKeyword: (keyword: string) => void
}

export function Todo({
  currentDate,
  searchKeyword,
  handleSetSearchKeyword,
}: TodoProps) {
  return (
    <section className="rounded border-saige-light-grey w-1/3 min-w-[500px] bg-white">
      <Header
        currentDate={currentDate}
        searchKeyword={searchKeyword}
        handleSetSearchKeyword={handleSetSearchKeyword}
      />
      <Content currentDate={currentDate} searchKeyword={searchKeyword} />
    </section>
  )
}
