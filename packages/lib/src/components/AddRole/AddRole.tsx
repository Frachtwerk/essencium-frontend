import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Flex,
  MantineSize,
  Modal,
  Space,
  Text,
  TextInput,
} from '@mantine/core'
import { IconShieldCheck } from '@tabler/icons-react'
import { t } from 'i18next'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { RightOutput, RoleInput, roleInputSchema } from 'types'

import { useZodForm } from '../../hooks'

type Props = {
  opened: boolean
  onClose: () => void
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  rights: RightOutput[]
  size: MantineSize
  handleCreateRole: (data: RoleInput) => void
}

function AddRole({
  opened,
  onClose,
  closeOnClickOutside,
  closeOnEscape,
  size,
  rights,
  handleCreateRole,
}: Props): JSX.Element {
  const [selectedRights, setSelectedRights] = useState<RightOutput[]>([])

  const { handleSubmit, control, formState, reset } = useZodForm({
    schema: roleInputSchema,
    defaultValues: {
      name: '',
      description: '',
      rights: [],
      protected: false,
      editable: true,
    },
  })

  function onSubmit(roleData: RoleInput): void {
    handleCreateRole({
      ...roleData,
      rights: [...selectedRights.map(right => right.id)],
    })
  }

  function toggleRight(right: RightOutput): void {
    if (selectedRights.some(r => r.id === right.id)) {
      setSelectedRights(selectedRights.filter(r => r.id !== right.id))
    } else {
      setSelectedRights([...selectedRights, right])
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={() => {
        reset()
        onClose()
      }}
      closeOnClickOutside={closeOnClickOutside}
      closeOnEscape={closeOnEscape}
      size={size}
      padding="lg"
      title={t('rolesView.modal.title')}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap="md">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Name"
                label="Name"
                required
                styles={{
                  label: {
                    fontWeight: 'bold',
                  },
                }}
                withAsterisk
              />
            )}
          />

          {formState.errors.name && (
            <Text mt={4} ml={5} fz="xs" color="red">
              {formState.errors.name?.message}
            </Text>
          )}

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Description"
                label="Description"
                required
                styles={{
                  label: {
                    fontWeight: 'bold',
                  },
                }}
                withAsterisk
              />
            )}
          />

          {formState.errors.description && (
            <Text mt={4} ml={5} fz="xs" color="red">
              {formState.errors.description?.message}
            </Text>
          )}

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
                    key={right.id}
                    value={right.id}
                    variant="light"
                    onClick={() => toggleRight(right)}
                  >
                    {right.name}
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
            {t('rolesView.modal.submit')}
          </Button>

          <Button
            variant="subtle"
            fullWidth
            mt="md"
            onClick={() => {
              reset()
              onClose()
            }}
          >
            {t('rolesView.modal.cancel')}
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}
export { AddRole }
