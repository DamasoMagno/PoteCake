import { toast, TypeOptions } from 'react-toastify'

export function alertMenssage(menssage: string, type: TypeOptions) {
  return toast(menssage, {
    autoClose: 1500,
    type,
    theme: 'colored',
  })
}
