/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import { NotificationData, showNotification } from '@mantine/notifications'

type TranslateFunction = (key: string) => string

export function withBaseStylingShowNotification(
  props: Omit<NotificationData, 'message'> & {
    notificationType: 'created' | 'updated' | 'deleted'
    color: 'success' | 'error'
    message?: NotificationData['message']
    t?: TranslateFunction
  },
): string {
  const t = props.t ?? ((key: string) => key)

  function getTitleOrMessage(
    type: 'title' | 'message',
  ): NotificationData[typeof type] {
    if (props[type]) return props[type]

    return t(
      `notifications.${props.notificationType}Data${
        props.color[0].toUpperCase() + props.color.slice(1)
      }.${type}`,
    )
  }

  return showNotification({
    autoClose: props.autoClose ?? 2500,
    title: getTitleOrMessage('title'),
    message: getTitleOrMessage('message'),
    color:
      props.color === 'success'
        ? 'green'
        : props.color === 'error'
          ? 'red'
          : 'blue',
    style: props.style ?? {
      position: 'fixed',
      top: '20px',
      right: '10px',
      zIndex: 100,
    },
  })
}
