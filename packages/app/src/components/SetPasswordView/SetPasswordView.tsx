import { Center } from '@mantine/core'

type SetPasswordViewProps = {
  setPasswordForm: JSX.Element
}

export function SetPasswordView({ setPasswordForm }: SetPasswordViewProps) {
  return (
    <Center w="100%" h="100%">
      {setPasswordForm}
    </Center>
  )
}
