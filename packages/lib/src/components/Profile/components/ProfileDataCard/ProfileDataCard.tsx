import { Card, Tabs } from '@mantine/core'
import { IconLock, IconSettings, IconUser } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

import {
  PasswordChangeForm,
  PersonalDataForm,
  ProfileSettingsForm,
} from './components'

export function ProfileDataCard(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Card shadow="sm" p="lg" radius="sm" withBorder>
      <Tabs defaultValue="personalDataForm">
        <Tabs.List>
          <Tabs.Tab value="personalDataForm" icon={<IconUser size={14} />}>
            {t('profileView.dataCard.tabs.personalData.title')}
          </Tabs.Tab>

          <Tabs.Tab value="passwordChange" icon={<IconLock size={14} />}>
            {t('profileView.dataCard.tabs.passwordChange.title')}
          </Tabs.Tab>

          <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
            {t('profileView.dataCard.tabs.settings.title')}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="personalDataForm" pt="lg">
          <PersonalDataForm />
        </Tabs.Panel>

        <Tabs.Panel value="passwordChange" pt="lg">
          <PasswordChangeForm />
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="lg">
          <ProfileSettingsForm />
        </Tabs.Panel>
      </Tabs>
    </Card>
  )
}