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
  MultiSelect,
  Switch,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../../../../hooks'
import classes from './ProfileSettingsForm.module.css'

type Props = {
  user: UserOutput
  roles: RoleOutput[]
  handleUpdate: (data: UserUpdate) => void
  isLoading: boolean
}

export function ProfileSettingsForm({
  user,
  roles,
  handleUpdate,
  isLoading,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()

  const { handleSubmit, control, formState } = useZodForm({
    schema: userUpdateSchema,
    defaultValues: { ...user, roles: user.roles.map(role => role.name) },
  })

  const rolesData = roles.map(role => {
    return { value: role.name, label: role.name }
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
                    color={
                      colorScheme === 'dark'
                        ? theme.colors.teal[7]
                        : theme.colors.teal[6]
                    }
                    stroke={3}
                  />
                ) : (
                  <IconX
                    size={12}
                    color={
                      colorScheme === 'dark'
                        ? theme.colors.gray[7]
                        : theme.colors.gray[6]
                    }
                    stroke={3}
                  />
                )
              }
            />
          )}
        />

        <Controller
          name="roles"
          control={control}
          render={({ field }) => (
            <MultiSelect
              {...field}
              mb="md"
              maw="60%"
              radius="sm"
              label={t('profileView.dataCard.tabs.settings.content.role')}
              placeholder={String(
                t('profileView.dataCard.tabs.settings.content.role'),
              )}
              data={rolesData}
              className={classes.select}
            />
          )}
        />

        <Box mt="-0.6rem" h="0.8rem">
          {formState.errors.roles && (
            <Text ml={5} fz="xs" color="red">
              {formState.errors.roles?.message}
            </Text>
          )}
        </Box>
      </Flex>

      <Button type="submit" mt="md" loading={isLoading}>
        {t('profileView.dataCard.tabs.settings.content.saveSettings')}
      </Button>
    </form>
  )
}
