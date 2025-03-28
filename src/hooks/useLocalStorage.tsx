import { useLayoutEffect, useState } from 'react'

/**
 *  로컬스토리지의 상태를 동기화하는 커스텀 훅
 * @params {string} key - 로컬스토리지에 저장할 키
 * @params {T} initialValue - 로컬스토리지에 저장된 값이 없는 경우의 초기값
 * @returns [storedValue, setStoredValue] 로컬스토리지에 저장된 값과 값을 업데이트하는 함수
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`While Reading localStorage ${[key]}, ${error}`)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState<T>(getStoredValue)

  useLayoutEffect(() => {
    const saveToLocalStorage = (value: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(`while setting localStorage ${[key]}, ${error}`)
      }
    }

    saveToLocalStorage(storedValue)
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}
