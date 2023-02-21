import { Text, useMantineTheme } from '@mantine/core'
import { IconX } from '@tabler/icons'

import { Notification } from './Notification'
import { HttpNotificationProps } from './types'

export function HttpNotification({
  children,
  isLoading,
  isError,
  error,
  ...props
}: HttpNotificationProps): JSX.Element | null {
  const theme = useMantineTheme()

  if (!isLoading && !isError) return null

  return (
    <Notification
      {...props}
      title={
        // eslint-disable-next-line no-nested-ternary
        isLoading
          ? 'Loading...'
          : isError
          ? `Error ${
              error?.response?.status ? `(${error?.response?.status})` : ''
            }`
          : ''
      }
      icon={isError && <IconX size={18} />}
      color={isError ? 'red' : theme.colors.blue[8]}
      loading={isLoading}
    >
      {isLoading && 'Retrieving data from the server'}

      {isError && <Text>{error?.message}</Text>}
    </Notification>
  )
}
