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
  UserOutput,
  UserUpdate,
} from '@frachtwerk/essencium-types'
import { Card, Tabs } from '@mantine/core'
import { IconLock, IconUser } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'

import { PasswordChangeForm, PersonalDataForm } from './components'

type Props = {
  user: UserOutput
  handleUpdate: (data: UserUpdate) => void
  handlePasswordUpdate: (
    oldPassword: PasswordChange['password'],
    newPassword: PasswordChange['password'],
  ) => void
  isUpdatingUser: boolean
  isUpdatingPassword: boolean
}

export function ProfileDataCard({
  user,
  handleUpdate,
  handlePasswordUpdate,
  isUpdatingPassword,
  isUpdatingUser,
}: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <Card shadow="sm" p="lg" radius="sm" withBorder>
      <Tabs defaultValue="personalDataForm">
        <Tabs.List>
          <Tabs.Tab
            value="personalDataForm"
            leftSection={<IconUser size={14} />}
          >
            {t('profileView.dataCard.tabs.personalData.title')}
          </Tabs.Tab>

          <Tabs.Tab value="passwordChange" leftSection={<IconLock size={14} />}>
            {t('profileView.dataCard.tabs.passwordChange.title')}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="personalDataForm" pt="lg">
          <PersonalDataForm
            user={user}
            handleUpdate={handleUpdate}
            isLoading={isUpdatingUser}
          />
        </Tabs.Panel>

        <Tabs.Panel value="passwordChange" pt="lg">
          <PasswordChangeForm
            handlePasswordUpdate={handlePasswordUpdate}
            isLoading={isUpdatingPassword}
          />
        </Tabs.Panel>
      </Tabs>
    </Card>
  )
}
