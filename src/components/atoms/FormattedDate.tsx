type FormattedDataProps = {
  date: Date
  options?: Intl.DateTimeFormatOptions
  className?: string
}

export function FormattedDate({
  date,
  options,
  className,
}: FormattedDataProps) {
  return (
    <span className={`${className}`}>
      {new Date(date).toLocaleDateString('ko-KR', options)}
    </span>
  )
}
