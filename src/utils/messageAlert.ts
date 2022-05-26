import { toast } from "react-toastify";

export function messageAlert(message: string){
  return toast(message, {
    delay: 0,
    theme: "light",
    autoClose: 2500,
    pauseOnFocusLoss: false
  });
}