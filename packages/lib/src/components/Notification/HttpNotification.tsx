import { NotificationProps, Text, useMantineTheme } from '@mantine/core'
import { IconX } from '@tabler/icons'

import { Notification } from './Notification'

export type HttpNotificationProps = NotificationProps & {
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
}: HttpNotificationProps): JSX.Element | null {
  const theme = useMantineTheme()

  if (!isLoading && !isError) return null

  return (
    <Notification
      {...props}
      title={
        // eslint-disable-next-line no-nested-ternary
        isLoading && loadingTitle
          ? loadingTitle
          : isError && errorTitle
          ? errorTitle
          : ''
      }
      icon={isError && <IconX data-testid="error-icon" size={18} />}
      color={isError ? 'red' : theme.colors.blue[8]}
      loading={isLoading}
    >
      {isLoading && loadingMessage && loadingMessage}

      {isError && errorMessage && <Text>{errorMessage}</Text>}
    </Notification>
  )
}
