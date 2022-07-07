import { Renderable, toast } from 'react-hot-toast'

interface AlertMessageProps {
  message: string
  icon?: Renderable
}

export function alertMessage({ message, icon }: AlertMessageProps) {
  return toast(message, {
    duration: 2500,
    position: 'top-center',
    icon,
    style: {
      padding: '16px',
      fontWeight: '700',
    },
  })
}
