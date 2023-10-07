/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

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
    newPassword: PasswordChange['password'],
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
