import { useEffect, useRef } from 'react'

/**
 * 특정 요소 외부 클릭을 감지하는 커스텀 훅
 * @param {Function} callback - 외부 클릭 시 실행할 콜백 함수
 * @returns {React.RefObject<HTMLDivElement>} - 특정 요소에 바인딩할 ref 객체 반환
 */
export function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  const rootElement = document.getElementById('root')

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback?.()
      }
    }

    rootElement?.addEventListener('click', handleClick)

    return () => rootElement?.removeEventListener('click', handleClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
