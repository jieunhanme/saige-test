import { Button } from 'antd'
import PlusIcon from '../../assets/img/plus.svg'

type AddButtonProps = {
  onClick: () => void
}

export function AddButton({ onClick }: AddButtonProps) {
  return (
    <Button size="large" type="primary" className="w-full" onClick={onClick}>
      <img src={PlusIcon} width={12} height={12} />
      <div className="font-extrabold">새로운 할 일 추가</div>
    </Button>
  )
}
