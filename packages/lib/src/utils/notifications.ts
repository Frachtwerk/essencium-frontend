import { NotificationProps, showNotification } from '@mantine/notifications'
import { i18n } from 'next-i18next'

export function withBaseStylingShowNotification(
  props: Omit<NotificationProps, 'message'> & {
    notificationType: 'created' | 'updated' | 'deleted'
    color: 'success' | 'error'
    message?: NotificationProps['message']
  }
): void {
  const t = i18n?.t ?? ((key: string) => key)

  function getTitleOrMessage(
    type: 'title' | 'message'
  ): NotificationProps[typeof type] {
    if (props[type]) return props[type]

    return t(
      `notifications.${props.notificationType}Data${
        props.color[0].toUpperCase() + props.color.slice(1)
      }.${type}`
    )
  }

  return showNotification({
    autoClose: props.autoClose ?? 2500,
    title: getTitleOrMessage('title'),
    message: getTitleOrMessage('message'),
    color:
      // eslint-disable-next-line no-nested-ternary
      props.color === 'success'
        ? 'green'
        : props.color === 'error'
        ? 'red'
        : 'blue',
    style: props.style ?? { position: 'fixed', top: '20px', right: '10px' },
  })
}
