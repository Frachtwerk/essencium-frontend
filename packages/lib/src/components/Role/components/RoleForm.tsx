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

import {
  RightOutput,
  RoleInput,
  RoleOutput,
  RoleUpdate,
} from '@frachtwerk/essencium-types'
import { Box, Button, Chip, Divider, Flex, Space } from '@mantine/core'
import { IconShieldCheck } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import type { JSX } from 'react'
import { Control, Controller } from 'react-hook-form'

import { ControlledTextInput } from '../../Form'

type Props = {
  rights: RightOutput[]
  toggleRight: (right: RightOutput) => void
  onSubmit: () => void
  control: Control<RoleInput | RoleUpdate>
  reset?: () => void
  onClose: () => void
  role?: RoleOutput
  isLoading: boolean
}

export function RoleForm({
  rights,
  toggleRight,
  onSubmit,
  control,
  onClose,
  role,
  reset,
  isLoading,
}: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <form onSubmit={onSubmit}>
      <Flex className="gap-md flex-col">
        <ControlledTextInput
          name="name"
          control={control}
          placeholder={t('rolesView.modal.placeholder.name') as string}
          label={t('rolesView.modal.name')}
          required
          variant="filled"
          withAsterisk
          disabled={Boolean(role)}
        />

        <ControlledTextInput
          name="description"
          control={control}
          placeholder={t('rolesView.modal.placeholder.description') as string}
          label={t('rolesView.modal.description')}
          variant="filled"
        />

        <Divider
          className="my-xs"
          label={
            <Flex className="items-start">
              <IconShieldCheck className="size-4" />
              <Box ml={5}>{t('rolesView.modal.rights')}</Box>
            </Flex>
          }
          labelPosition="center"
        />

        <Controller
          name="rights"
          control={control}
          render={() => (
            <Flex className="gap-sm my-xs flex-wrap">
              {Object.values(rights).map(right => (
                <Chip
                  defaultChecked={Boolean(
                    role &&
                      role.rights.length > 0 &&
                      role?.rights.find(
                        item => item.authority === right.authority,
                      ),
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

      <Space h="lg" />

      <Flex className="gap-lg justify-around">
        <Button type="submit" fullWidth className="mt-md" loading={isLoading}>
          {role ? t('rolesView.modal.update') : t('rolesView.modal.submit')}
        </Button>

        <Button
          variant="subtle"
          fullWidth
          className="mt-md"
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
