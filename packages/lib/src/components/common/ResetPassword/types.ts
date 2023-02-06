import { Dispatch, SetStateAction } from 'react'

export interface ResetPasswordProps {
  setOpen: Dispatch<SetStateAction<boolean>>
  setSent: Dispatch<SetStateAction<boolean>>
}
