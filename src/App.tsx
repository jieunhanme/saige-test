import { Button, ConfigProvider } from 'antd'
import './App.css'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF4052',
          borderRadius: 4,
          fontFamily: 'MinSans',
        },
      }}
    >
      <div className="text-saige-dark-grey">
        이곳에 To-Do App을 작성해주세요.
      </div>
      <Button type="primary">버튼</Button>
    </ConfigProvider>
  )
}

export default App
