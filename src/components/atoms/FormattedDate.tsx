type FormattedDataProps = {
  currentDate: Date
  options?: Intl.DateTimeFormatOptions
  className?: string
}

export function FormattedDate({
  currentDate,
  options,
  className,
}: FormattedDataProps) {
  return (
    <span className={`text-saige-dark-grey ${className}`}>
      {new Date(currentDate).toLocaleDateString('ko-KR', options)}
    </span>
  )
}
