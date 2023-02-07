import {
  Button,
  Flex,
  MediaQuery,
  Select,
  Switch,
  useMantineTheme,
} from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function ProfileSettingsForm(): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  const [checked, setChecked] = useState(false)

  return (
    <>
      <Flex direction="column" gap="sm">
        <Switch
          checked={checked}
          onChange={event => setChecked(event.currentTarget.checked)}
          color="blue"
          size="md"
          mt="sm"
          label={t('profileView.dataCard.tabs.settings.content.status')}
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

        <MediaQuery query="(max-width: 600px)" styles={{ minWidth: '100%' }}>
          <Select
            mb="md"
            maw="60%"
            radius="sm"
            label={t('profileView.dataCard.tabs.settings.content.role')}
            placeholder={
              t('profileView.dataCard.tabs.settings.content.role') as string
            }
            data={[
              { value: 'user', label: 'Nutzer' },
              { value: 'admin', label: 'Administrator' },
            ]}
          />
        </MediaQuery>
      </Flex>

      <Button mt="md" variant="light">
        {t('profileView.dataCard.tabs.settings.content.saveSettings')}
      </Button>
    </>
  )
}
