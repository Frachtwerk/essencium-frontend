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
  roleUpdateSchema,
} from '@frachtwerk/essencium-types'
import { Modal } from '@mantine/core'
import { Dispatch, SetStateAction, useEffect } from 'react'

import { useZodForm } from '../../hooks'
import { RoleForm } from './components/RoleForm'

type Props = {
  title: string
  opened: boolean
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  onClose: () => void
  rights: RightOutput[]
  role: RoleOutput
  formDefaults: RoleInput
  updateRole: (data: RoleUpdate) => void
  toggleRight: (right: RightOutput) => void
  setSelectedRights: Dispatch<SetStateAction<RightOutput[]>>
}

export function EditRole({
  title,
  opened,
  closeOnClickOutside,
  closeOnEscape,
  onClose,
  rights,
  role,
  formDefaults,
  updateRole,
  toggleRight,
  setSelectedRights,
}: Props): JSX.Element {
  useEffect(() => {
    if (!role) return
    setSelectedRights(role.rights)
  }, [role, setSelectedRights])

  const {
    handleSubmit,
    control,
    formState,
    reset: prefillForm,
  } = useZodForm({
    schema: roleUpdateSchema,
    defaultValues: formDefaults,
  })

  useEffect(() => {
    if (role) {
      const parsedRole = roleUpdateSchema.parse({
        ...role,
        rights: role.rights.map(right => right.authority),
      })

      prefillForm({ ...parsedRole })
    }
  }, [role, prefillForm])

  const onSubmit = handleSubmit(updateRole)

  return (
    <Modal
      title={title}
      opened={opened}
      closeOnClickOutside={closeOnClickOutside}
      closeOnEscape={closeOnEscape}
      onClose={() => {
        onClose()
        setSelectedRights([])
      }}
      padding="lg"
      size="xl"
    >
      <RoleForm
        rights={rights}
        role={role}
        onSubmit={onSubmit}
        toggleRight={toggleRight}
        control={control}
        formState={formState}
        onClose={() => {
          onClose()
          setSelectedRights([])
        }}
      />
    </Modal>
  )
}
