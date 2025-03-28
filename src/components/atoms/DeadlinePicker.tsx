import { DatePicker, DatePickerProps } from 'antd'
import locale from 'antd/es/date-picker/locale/ko_KR'
import dayjs from 'dayjs'

const presets = [
  { label: '오늘', value: dayjs() },
  { label: '내일', value: dayjs().add(1, 'day') },
  { label: '다음 주', value: dayjs().add(7, 'day') },
  { label: '다음 달', value: dayjs().add(1, 'month') },
]

interface DeadlinePickerProps extends DatePickerProps {}

export function DeadlinePicker({
  value,
  onChange,
  ...props
}: DeadlinePickerProps) {
  return (
    <DatePicker
      locale={locale}
      placeholder="마감일"
      format="YYYY.M.DD"
      presets={presets}
      showNow={false}
      {...props}
      value={value}
      onChange={onChange}
      allowClear={false}
      getPopupContainer={(node) => {
        if (node) {
          return node.parentNode as HTMLElement
        }
        return document.body
      }}
    />
  )
}
