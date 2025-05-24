import { Input, Stack } from '@mantine/core'
import type { JSX, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type InputErrorStackProps = {
  children: ReactNode
  message: string | undefined
}

export function InputErrorStack({
  message,
  children,
}: InputErrorStackProps): JSX.Element {
  const { t } = useTranslation()

  return (
    <Stack gap="5px">
      {children}

      <Input.Error h="0.9rem">{message && t(message)}</Input.Error>
    </Stack>
  )
}
