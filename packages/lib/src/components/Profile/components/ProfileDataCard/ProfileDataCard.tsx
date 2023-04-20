import { Card, Tabs } from '@mantine/core'
import { IconLock, IconSettings, IconUser } from '@tabler/icons-react'
import { useMatch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { PasswordChange, RoleOutput, UserInput, UserOutput } from 'types'

import {
  PasswordChangeForm,
  PersonalDataForm,
  ProfileSettingsForm,
} from './components'

type Props = {
  user: UserOutput
  roles: RoleOutput[]
  handleUpdate: (data: UserInput) => void
  handlePasswordUpdate: (
    oldPassword: PasswordChange['password'],
    newPassword: PasswordChange['password']
  ) => void
}

export function ProfileDataCard({
  user,
  roles,
  handleUpdate,
  handlePasswordUpdate,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const { route } = useMatch()
  const { path } = route

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

          {path !== 'profile' ? (
            <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
              {t('profileView.dataCard.tabs.settings.title')}
            </Tabs.Tab>
          ) : null}
        </Tabs.List>

        <Tabs.Panel value="personalDataForm" pt="lg">
          <PersonalDataForm user={user} handleUpdate={handleUpdate} />
        </Tabs.Panel>

        <Tabs.Panel value="passwordChange" pt="lg">
          <PasswordChangeForm handlePasswordUpdate={handlePasswordUpdate} />
        </Tabs.Panel>

        {path !== 'profile' ? (
          <Tabs.Panel value="settings" pt="lg">
            <ProfileSettingsForm
              user={user}
              handleUpdate={handleUpdate}
              roles={roles}
            />
          </Tabs.Panel>
        ) : null}
      </Tabs>
    </Card>
  )
}
