import { Renderable, toast } from 'react-hot-toast'

interface AlertMessageProps {
  message: string
  icon?: Renderable
}

export function alertMessage({ message, icon }: AlertMessageProps) {
  return toast(message, {
    duration: 1500,
    position: 'top-right',
    icon,
    style: {
      padding: '16px',
      fontWeight: '700',
    },
  })
}
