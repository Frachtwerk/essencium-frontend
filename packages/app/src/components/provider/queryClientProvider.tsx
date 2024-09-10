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

'use client'

import { NotificationData } from '@mantine/notifications'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

import { withBaseStylingShowNotification } from '@/utils'

export function QueryProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (_, query) => {
            if (query?.meta?.errorNotification) {
              const {
                title,
                message,
                notificationType,
              }: Omit<NotificationData, 'message'> =
                query.meta.errorNotification

              withBaseStylingShowNotification({
                title,
                message,
                color: 'error',
                notificationType,
              })
            }
          },
          onSuccess: (_, query) => {
            if (query?.meta?.successNotification) {
              const {
                title,
                message,
                notificationType,
              }: Omit<NotificationData, 'message'> =
                query.meta.successNotification

              withBaseStylingShowNotification({
                title,
                message,
                color: 'success',
                notificationType,
              })
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, variables, context, mutation) => {
            if (mutation?.meta?.errorNotification) {
              const {
                title,
                message,
                notificationType,
              }: Omit<NotificationData, 'message'> =
                mutation.meta.errorNotification

              withBaseStylingShowNotification({
                title,
                message,
                color: 'error',
                notificationType,
              })
            }
          },
          onSuccess: (error, variables, context, mutation) => {
            if (mutation?.meta?.successNotification) {
              const {
                title,
                message,
                notificationType,
              }: Omit<NotificationData, 'message'> =
                mutation.meta.successNotification
              withBaseStylingShowNotification({
                title,
                message,
                color: 'success',
                notificationType,
              })
            }
          },
        }),
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
