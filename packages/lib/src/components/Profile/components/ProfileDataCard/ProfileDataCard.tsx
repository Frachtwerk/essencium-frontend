import { Card, Tabs } from '@mantine/core'
import { IconLock, IconSettings, IconUser } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import { UserProps } from '../../types'
import {
  PasswordChangeForm,
  PersonalDataForm,
  ProfileSettingsForm,
} from './components'

export function ProfileDataCard({
  user,
  roles,
  handleUpdate,
  handlePasswordUpdate,
}: UserProps): JSX.Element {
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
          <PersonalDataForm
            user={{
              firstName: user.firstName,
              lastName: user.lastName,
              phone: user.phone,
              mobile: user.mobile,
              email: user.email,
              locale: user.locale,
              enabled: user.enabled,
            }}
            handleUpdate={handleUpdate}
          />
        </Tabs.Panel>

        <Tabs.Panel value="passwordChange" pt="lg">
          <PasswordChangeForm handlePasswordUpdate={handlePasswordUpdate} />
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="lg">
          <ProfileSettingsForm
            user={{
              firstName: user.firstName,
              lastName: user.lastName,
              enabled: user.enabled,
              role: { id: user.role.id },
            }}
            handleUpdate={handleUpdate}
            roles={roles}
          />
        </Tabs.Panel>
      </Tabs>
    </Card>
  )
}
