import {
  PasswordChange,
  RoleOutput,
  UserOutput,
  UserUpdate,
} from '@frachtwerk/essencium-types'
import { Card, Tabs } from '@mantine/core'
import { IconLock, IconSettings, IconUser } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import {
  PasswordChangeForm,
  PersonalDataForm,
  ProfileSettingsForm,
} from './components'

type Props = {
  user: UserOutput
  roles: RoleOutput[]
  handleUpdate: (data: UserUpdate) => void
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

  const router = useRouter()

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

          {router.pathname !== 'profile' ? (
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

        {router.pathname !== 'profile' ? (
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
