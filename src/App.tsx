import { ConfigProvider } from 'antd'

import { useCurrentDate, useLocalStorage } from './hooks'
import { Todo } from './components/templates'
import './App.css'

function App() {
  const currentDate = useCurrentDate()
  const [storedValue, setStoredValue] = useLocalStorage<string>('keyword', '')

  const handleSetSearchKeyword = (keyword: string) => {
    setStoredValue(keyword)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF4052',
          borderRadius: 8,
          fontFamily: 'MinSans',
        },
      }}
    >
      <Todo
        currentDate={currentDate}
        searchKeyword={storedValue}
        handleSetSearchKeyword={handleSetSearchKeyword}
      />
    </ConfigProvider>
  )
}

export default App
