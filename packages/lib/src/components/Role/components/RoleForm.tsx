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
  RightOutput,
  RoleInput,
  RoleOutput,
  RoleUpdate,
} from '@frachtwerk/essencium-types'
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Flex,
  Space,
  Text,
  TextInput,
} from '@mantine/core'
import { IconShieldCheck } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import { Control, Controller, FormState } from 'react-hook-form'

type Props = {
  rights: RightOutput[]
  toggleRight: (right: RightOutput) => void
  onSubmit: () => void
  control: Control<RoleInput | RoleUpdate>
  formState: FormState<RoleInput | RoleUpdate>
  reset?: () => void
  onClose: () => void
  role?: RoleOutput
}

export function RoleForm({
  rights,
  toggleRight,
  onSubmit,
  control,
  formState,
  onClose,
  role,
  reset,
}: Props): JSX.Element {
  const { t } = useTranslation()
  return (
    <form onSubmit={onSubmit}>
      <Flex direction="column" gap="md">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder={t('rolesView.modal.placeholder.name') as string}
              label={t('rolesView.modal.name')}
              required
              variant="filled"
              styles={{
                label: {
                  fontWeight: 'bold',
                },
              }}
              withAsterisk
              disabled={Boolean(role)}
            />
          )}
        />

        <Box mt="-0.6rem" h="0.8rem">
          {formState.errors.name && (
            <Text ml={5} fz="xs" color="red">
              {formState.errors.name?.message
                ? String(t(formState.errors.name.message))
                : null}
            </Text>
          )}
        </Box>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder={
                t('rolesView.modal.placeholder.description') as string
              }
              label={t('rolesView.modal.description')}
              required
              variant="filled"
              styles={{
                label: {
                  fontWeight: 'bold',
                },
              }}
              withAsterisk
            />
          )}
        />

        <Box mt="-0.6rem" h="0.8rem">
          {formState.errors.description && (
            <Text ml={5} fz="xs" color="red">
              {formState.errors.description?.message
                ? String(t(formState.errors.description.message))
                : null}
            </Text>
          )}
        </Box>

        <Divider
          my="xs"
          label={
            <Flex align="start">
              <IconShieldCheck size={16} />
              <Box ml={5}>{t('rolesView.modal.rights')}</Box>
            </Flex>
          }
          labelPosition="center"
        />

        <Controller
          name="rights"
          control={control}
          render={() => (
            <Flex wrap="wrap" gap="sm" my="xs">
              {Object.values(rights).map(right => (
                <Chip
                  defaultChecked={Boolean(
                    role &&
                      role.rights.length > 0 &&
                      role?.rights.find(
                        item => item.authority === right.authority
                      )
                  )}
                  key={right.authority}
                  value={right.authority}
                  variant="light"
                  onClick={() => toggleRight(right)}
                >
                  {right.authority}
                </Chip>
              ))}
            </Flex>
          )}
        />
      </Flex>

      <Divider my="xl" />

      <Flex gap="lg" justify="start">
        <Controller
          name="protected"
          control={control}
          render={({ field }) => (
            <Checkbox
              value={undefined}
              onChange={() => field.onChange(!field.value)}
              checked={field.value}
              label={t('rolesView.modal.protected')}
              size="sm"
            />
          )}
        />

        <Controller
          name="editable"
          control={control}
          render={({ field }) => (
            <Checkbox
              value={undefined}
              onChange={() => field.onChange(!field.value)}
              checked={field.value}
              label={t('rolesView.modal.editable')}
              size="sm"
            />
          )}
        />
      </Flex>

      <Space h="lg" />

      <Flex justify="space-around" gap="lg">
        <Button type="submit" fullWidth mt="md">
          {role ? t('rolesView.modal.update') : t('rolesView.modal.submit')}
        </Button>

        <Button
          variant="subtle"
          fullWidth
          mt="md"
          onClick={() => {
            if (reset) reset()
            onClose()
          }}
        >
          {t('rolesView.modal.cancel')}
        </Button>
      </Flex>
    </form>
  )
}
