import {
  RoleOutput,
  UserOutput,
  UserUpdate,
  userUpdateSchema,
} from '@frachtwerk/essencium-types'
import {
  Box,
  Button,
  Flex,
  MediaQuery,
  Select,
  Switch,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../../../../hooks'

type Props = {
  user: UserOutput
  roles: RoleOutput[]
  handleUpdate: (data: UserUpdate) => void
}

export function ProfileSettingsForm({
  user,
  roles,
  handleUpdate,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  const { handleSubmit, control, formState, setValue } = useZodForm({
    schema: userUpdateSchema,
    defaultValues: { ...user, role: user.role.id },
  })

  function onSubmit(data: UserUpdate): void {
    handleUpdate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="sm">
        <Controller
          name="enabled"
          control={control}
          render={({ field }) => (
            <Switch
              {...field}
              checked={field.value}
              value={String(field.value)}
              color="blue"
              size="md"
              mt="sm"
              label={t('profileView.dataCard.tabs.settings.content.status')}
              thumbIcon={
                user.enabled ? (
                  <IconCheck
                    size={12}
                    color={theme.colors.teal[theme.fn.primaryShade()]}
                    stroke={3}
                  />
                ) : (
                  <IconX
                    size={12}
                    color={theme.colors.gray[theme.fn.primaryShade()]}
                    stroke={3}
                  />
                )
              }
            />
          )}
        />

        <MediaQuery query="(max-width: 600px)" styles={{ minWidth: '100%' }}>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={String(field.value)}
                onChange={newVal => setValue(field.name, Number(newVal))}
                mb="md"
                maw="60%"
                radius="sm"
                label={t('profileView.dataCard.tabs.settings.content.role')}
                placeholder={String(
                  t('profileView.dataCard.tabs.settings.content.role')
                )}
                data={(roles || []).map(role => ({
                  value: String(role.id),
                  label: role.name,
                }))}
              />
            )}
          />
        </MediaQuery>

        <Box mt="-0.6rem" h="0.8rem">
          {formState.errors.role && (
            <Text ml={5} fz="xs" color="red">
              {formState.errors.role?.message}
            </Text>
          )}
        </Box>
      </Flex>

      <Button type="submit" mt="md" variant="light">
        {t('profileView.dataCard.tabs.settings.content.saveSettings')}
      </Button>
    </form>
  )
}
