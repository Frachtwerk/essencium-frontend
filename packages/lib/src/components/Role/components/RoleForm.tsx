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
import classes from './RoleForm.module.css'

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
      <Flex direction="column" gap="md">
        <ControlledTextInput
          name="name"
          control={control}
          placeholder={t('rolesView.modal.placeholder.name') as string}
          label={t('rolesView.modal.name')}
          required
          variant="filled"
          classNames={{
            label: classes['role-form__text-input--label'],
          }}
          withAsterisk
          disabled={Boolean(role)}
        />

        <ControlledTextInput
          name="description"
          control={control}
          placeholder={t('rolesView.modal.placeholder.description') as string}
          label={t('rolesView.modal.description')}
          variant="filled"
          classNames={{
            label: classes['role-form__text-input--label'],
          }}
        />

        <Divider
          className={classes['role-form__divider--margin-xs']}
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

      <Flex justify="space-around" gap="lg">
        <Button
          type="submit"
          fullWidth
          className={classes['role-form__button']}
          loading={isLoading}
        >
          {role ? t('rolesView.modal.update') : t('rolesView.modal.submit')}
        </Button>

        <Button
          variant="subtle"
          fullWidth
          className={classes['role-form__button']}
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
