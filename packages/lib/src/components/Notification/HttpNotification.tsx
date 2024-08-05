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
