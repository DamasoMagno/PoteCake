import { IconBaseProps, IconType } from 'react-icons'
import { toast, TypeOptions } from 'react-toastify'

export function alertMenssage(
  menssage: string,
  type: TypeOptions,
  icon: IconType
) {
  return toast(menssage, {
    type,
    autoClose: 1000,
    icon,
    theme: 'colored',
    bodyStyle: {
      fontSize: '1.25rem',
    },
    closeButton: true,
  })
}
