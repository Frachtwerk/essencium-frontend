import {
  RightOutput,
  RoleInput,
  RoleOutput,
  RoleUpdate,
} from '@frachtwerk/essencium-types'
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Flex,
  Space,
  Text,
  TextInput,
} from '@mantine/core'
import { IconShieldCheck } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import { Control, Controller, FormState } from 'react-hook-form'

type Props = {
  rights: RightOutput[]
  toggleRight: (right: RightOutput) => void
  onSubmit: () => void
  control: Control<RoleInput | RoleUpdate>
  formState: FormState<RoleInput | RoleUpdate>
  reset?: () => void
  onClose: () => void
  role?: RoleOutput
}

export function RoleForm({
  rights,
  toggleRight,
  onSubmit,
  control,
  formState,
  onClose,
  role,
  reset,
}: Props): JSX.Element {
  const { t } = useTranslation()
  return (
    <form onSubmit={onSubmit}>
      <Flex direction="column" gap="md">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder={t('rolesView.modal.placeholder.name') as string}
              label={t('rolesView.modal.name')}
              required
              variant="filled"
              styles={{
                label: {
                  fontWeight: 'bold',
                },
              }}
              withAsterisk
            />
          )}
        />

        <Box mt="-0.6rem" h="0.8rem">
          {formState.errors.name && (
            <Text ml={5} fz="xs" color="red">
              {formState.errors.name?.message}
            </Text>
          )}
        </Box>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder={
                t('rolesView.modal.placeholder.description') as string
              }
              label={t('rolesView.modal.description')}
              required
              variant="filled"
              styles={{
                label: {
                  fontWeight: 'bold',
                },
              }}
              withAsterisk
            />
          )}
        />

        <Box mt="-0.6rem" h="0.8rem">
          {formState.errors.description && (
            <Text ml={5} fz="xs" color="red">
              {formState.errors.description?.message}
            </Text>
          )}
        </Box>

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
                  defaultChecked={
                    role &&
                    role.rights.length > 0 &&
                    role?.rights.find(item => item.id === right.id)
                  }
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
          {role ? t('rolesView.modal.update') : t('rolesView.modal.submit')}
        </Button>

        <Button
          variant="subtle"
          fullWidth
          mt="md"
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
