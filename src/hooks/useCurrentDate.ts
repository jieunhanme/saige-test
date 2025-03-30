import { useState, useEffect } from 'react'

/**
 * 현재 날짜를 제공하고 자정에 날짜를 업데이트하는 커스텀 훅
 * @returns {Date} 현재 날짜 객체를 반환
 */
export function useCurrentDate() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  useEffect(() => {
    const timeOut = () => {
      const now = Date.now()
      const midnight = new Date(now).setHours(24, 0, 0, 0)

      return midnight - now
    }

    const interval = setInterval(() => setCurrentDate(new Date()), timeOut())

    return () => clearInterval(interval)
  }, [])

  return currentDate
}
