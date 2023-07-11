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
      />
    </Modal>
  )
}
