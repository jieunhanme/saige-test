import { useState, useEffect } from 'react'

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
