import {
  RightOutput,
  RoleInput,
  RoleOutput,
  RoleUpdate,
  roleUpdateSchema,
} from '@frachtwerk/essencium-types'
import { Modal } from '@mantine/core'
import { useEffect, useState } from 'react'

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
}: Props): JSX.Element {
  const [selectedRights, setSelectedRights] = useState<RightOutput[]>([])

  useEffect(() => {
    if (!role) return
    setSelectedRights(role.rights)
  }, [role])

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
        rights: role.rights.map(right => right.id),
      })

      prefillForm({ ...parsedRole })
    }
  }, [role, prefillForm])

  function handleUpdateRole(roleData: RoleInput): void {
    updateRole({
      ...roleData,
      rights: [...selectedRights.map(right => right.id)],
    })
  }

  const onSubmit = handleSubmit(handleUpdateRole)

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
