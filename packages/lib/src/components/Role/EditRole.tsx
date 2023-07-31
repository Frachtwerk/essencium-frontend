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
