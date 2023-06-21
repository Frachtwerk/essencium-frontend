import {
  RightOutput,
  RoleInput,
  roleInputSchema,
} from '@frachtwerk/essencium-types'
import { Modal } from '@mantine/core'
import { useState } from 'react'

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
}: Props): JSX.Element {
  const [selectedRights, setSelectedRights] = useState<RightOutput[]>([])

  const { handleSubmit, control, formState, reset } = useZodForm({
    schema: roleInputSchema,
    defaultValues: formDefaults,
  })

  function handleCreateRole(roleData: RoleInput): void {
    createRole({
      ...roleData,
      rights: [...selectedRights.map(right => right.id)],
    })
  }

  const onSubmit = handleSubmit(handleCreateRole)

  function toggleRight(right: RightOutput): void {
    if (selectedRights.some(r => r.id === right.id)) {
      setSelectedRights(selectedRights.filter(r => r.id !== right.id))
    } else {
      setSelectedRights([...selectedRights, right])
    }
  }

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
      />
    </Modal>
  )
}
