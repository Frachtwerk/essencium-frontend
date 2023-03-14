import type { Dispatch, SetStateAction } from 'react'

export type ResetPasswordProps = {
  setIsPasswordResetFormOpened: Dispatch<SetStateAction<boolean>>
  setIsResetPasswordSent: Dispatch<SetStateAction<boolean>>
}
