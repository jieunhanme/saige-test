import { Button } from 'antd'

import GarbageIcon from '../../assets/img/garbage.svg'
import GarbageOpenIcon from '../../assets/img/garbage-open.svg'

const garbageOption = {
  src: GarbageIcon,
  width: 18,
  height: 18,
}

const garbageOpenOption = {
  src: GarbageOpenIcon,
  width: 24,
  height: 24,
}

type RemoveButtonProps = {
  isRemoving: boolean
  onClick: () => void
}

export function RemoveButton({ isRemoving, onClick }: RemoveButtonProps) {
  return (
    <Button
      size="large"
      icon={<img {...(isRemoving ? garbageOpenOption : garbageOption)} />}
      onClick={onClick}
    />
  )
}
