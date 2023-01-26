import { Button, Flex, Select, Switch, useMantineTheme } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function ProfileSettingsForm() {
  const { t } = useTranslation()
  const theme = useMantineTheme()
  const [checked, setChecked] = useState(false)
  return (
    <Flex
      direction={{ base: 'column', xs: 'column' }}
      gap={{ base: 'sm', xs: 'lg' }}
      align={{ base: 'center', xs: 'flex-start' }}
    >
      <Switch
        checked={checked}
        onChange={event => setChecked(event.currentTarget.checked)}
        color="blue"
        size="md"
        mt="sm"
        label={checked ? 'active' : 'inactive'}
        thumbIcon={
          checked ? (
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

      <Select
        mb="md"
        miw="45%"
        radius="md"
        label={t('ProfileView.dataCard.tabs.personalData.content.role')}
        placeholder={
          t('ProfileView.dataCard.tabs.personalData.content.role') as string
        }
        data={[
          { value: 'user', label: 'Nutzer' },
          { value: 'admin', label: 'Administrator' },
        ]}
      />
      <Button mt="md" leftIcon={<IconCheck />}>
        save settings
      </Button>
    </Flex>
  )
}
