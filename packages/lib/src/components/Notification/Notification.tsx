import {
  Notification as MantineNotification,
  NotificationProps,
} from '@mantine/core'
import { createPortal } from 'react-dom'

export function Notification({
  children,
  ...props
}: NotificationProps): JSX.Element {
  return createPortal(
    <MantineNotification
      w={500}
      styles={{
        root: { position: 'fixed', top: 20, right: 20, zIndex: 1000 },
      }}
      {...props}
    >
      {children}
    </MantineNotification>,
    document.getElementById('notification') as HTMLElement
  )
}
