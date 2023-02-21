import { NotificationProps } from '@mantine/core'
import { AxiosError } from 'axios'

export type HttpNotificationProps = NotificationProps & {
  isLoading: boolean
  isError: boolean
  error: AxiosError | null
}
