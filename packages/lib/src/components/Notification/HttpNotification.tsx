import { NotificationProps, Text, useMantineTheme } from '@mantine/core'
import { IconX } from '@tabler/icons-react'

import { Notification } from './Notification'

type Props = NotificationProps & {
  isLoading: boolean
  isError: boolean
  errorTitle?: string
  errorMessage?: string
  loadingTitle?: string
  loadingMessage?: string
}

export function HttpNotification({
  children,
  isLoading,
  isError,
  errorTitle,
  errorMessage,
  loadingTitle,
  loadingMessage,
  ...props
}: Props): JSX.Element | null {
  const theme = useMantineTheme()

  if (!isLoading && !isError) return null

  function getTitle(): string {
    if (isLoading && loadingTitle) return loadingTitle

    if (isError && errorTitle) return errorTitle

    return ''
  }

  return (
    <Notification
      {...props}
      title={getTitle()}
      icon={isError && <IconX data-testid="error-icon" size={18} />}
      color={isError ? 'red' : theme.colors.blue[8]}
      loading={isLoading}
    >
      {isLoading && loadingMessage && loadingMessage}

      {isError && errorMessage && <Text>{errorMessage}</Text>}
    </Notification>
  )
}
