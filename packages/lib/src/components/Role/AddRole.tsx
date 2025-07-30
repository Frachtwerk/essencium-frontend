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
  roleInputSchema,
} from '@frachtwerk/essencium-types'
import { Modal } from '@mantine/core'
import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { useZodForm } from '../../hooks'
import { RoleForm } from './components/RoleForm'

type Props = {
  title: string
  opened: boolean
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  onClose: () => void
  rights: RightOutput[]
  createRole: (data: RoleInput) => void
  formDefaults: RoleInput
  toggleRight: (right: RightOutput) => void
  isLoading: boolean
}

export function AddRole({
  title,
  opened,
  closeOnClickOutside,
  closeOnEscape,
  onClose,
  rights,
  createRole,
  formDefaults,
  toggleRight,
  isLoading,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const { handleSubmit, control, reset } = useZodForm({
    schema: roleInputSchema,
    defaultValues: formDefaults,
  })

  const onSubmit = handleSubmit((data: RoleInput) => {
    createRole(data)

    reset()
  })

  return (
    <Modal
      title={title}
      opened={opened}
      closeOnClickOutside={closeOnClickOutside}
      closeOnEscape={closeOnEscape}
      onClose={onClose}
      padding="lg"
      size="xl"
      closeButtonProps={{ 'aria-label': t('rolesView.modal.cancel') }}
    >
      <RoleForm
        rights={rights}
        onSubmit={onSubmit}
        toggleRight={toggleRight}
        control={control}
        reset={reset}
        onClose={onClose}
        isLoading={isLoading}
      />
    </Modal>
  )
}
