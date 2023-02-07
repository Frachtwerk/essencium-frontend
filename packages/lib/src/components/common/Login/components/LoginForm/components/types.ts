import type { Dispatch, SetStateAction } from 'react'

export type ResetPasswordProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
  setSent: Dispatch<SetStateAction<boolean>>
}
