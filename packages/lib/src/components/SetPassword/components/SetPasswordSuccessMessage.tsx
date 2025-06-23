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

import { Button, Center, Stack, Text, Title } from '@mantine/core'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import type { JSX } from 'react'

export function SetPasswordSuccessMessage(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Center>
      <Stack>
        <Title order={4} className="mb-md">
          {t('setPasswordView.successMessage.title')}
        </Title>

        <Text className="text-sm">
          {t('setPasswordView.successMessage.text')}
        </Text>

        <Button
          component={NextLink}
          href="/login"
          className="text-white mt-md no-underline"
          fullWidth
        >
          {t('setPasswordView.successMessage.button')}
        </Button>
      </Stack>
    </Center>
  )
}
