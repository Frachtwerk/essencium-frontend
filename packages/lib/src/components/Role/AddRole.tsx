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
  roleInputSchema,
} from '@frachtwerk/essencium-types'
import { Modal } from '@mantine/core'

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
  const { handleSubmit, control, formState, reset } = useZodForm({
    schema: roleInputSchema,
    defaultValues: formDefaults,
  })

  const onSubmit = handleSubmit(createRole)

  return (
    <Modal
      title={title}
      opened={opened}
      closeOnClickOutside={closeOnClickOutside}
      closeOnEscape={closeOnEscape}
      onClose={onClose}
      padding="lg"
      size="xl"
    >
      <RoleForm
        rights={rights}
        onSubmit={onSubmit}
        toggleRight={toggleRight}
        control={control}
        formState={formState}
        reset={reset}
        onClose={onClose}
        isLoading={isLoading}
      />
    </Modal>
  )
}
