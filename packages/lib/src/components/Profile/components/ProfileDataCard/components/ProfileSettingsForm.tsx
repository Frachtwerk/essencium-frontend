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
import {
  RoleOutput,
  UserOutput,
  UserUpdate,
  userUpdateSchema,
} from '@frachtwerk/essencium-types'
import {
  Box,
  Button,
  Flex,
  MediaQuery,
  Select,
  Switch,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../../../../hooks'

type Props = {
  user: UserOutput
  roles: RoleOutput[]
  handleUpdate: (data: UserUpdate) => void
}

export function ProfileSettingsForm({
  user,
  roles,
  handleUpdate,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  const { handleSubmit, control, formState } = useZodForm({
    schema: userUpdateSchema,
    defaultValues: { ...user, role: user.role.name },
  })

  function onSubmit(data: UserUpdate): void {
    handleUpdate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="sm">
        <Controller
          name="enabled"
          control={control}
          render={({ field }) => (
            <Switch
              {...field}
              checked={field.value}
              value={String(field.value)}
              color="blue"
              size="md"
              mt="sm"
              label={t('profileView.dataCard.tabs.settings.content.status')}
              thumbIcon={
                user.enabled ? (
                  <IconCheck
                    size={12}
                    color={theme.colors.teal[theme.fn.primaryShade()]}
                    stroke={3}
                  />
                ) : (
                  <IconX
                    size={12}
                    color={theme.colors.gray[theme.fn.primaryShade()]}
                    stroke={3}
                  />
                )
              }
            />
          )}
        />

        <MediaQuery query="(max-width: 600px)" styles={{ minWidth: '100%' }}>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mb="md"
                maw="60%"
                radius="sm"
                label={t('profileView.dataCard.tabs.settings.content.role')}
                placeholder={String(
                  t('profileView.dataCard.tabs.settings.content.role')
                )}
                data={(roles || []).map(role => role.name)}
              />
            )}
          />
        </MediaQuery>

        <Box mt="-0.6rem" h="0.8rem">
          {formState.errors.role && (
            <Text ml={5} fz="xs" color="red">
              {formState.errors.role?.message}
            </Text>
          )}
        </Box>
      </Flex>

      <Button type="submit" mt="md">
        {t('profileView.dataCard.tabs.settings.content.saveSettings')}
      </Button>
    </form>
  )
}
