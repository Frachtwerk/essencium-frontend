import { Card, Tabs } from '@mantine/core'
import { IconLock, IconUser } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

import { PasswordChangeForm } from './PasswordChangeForm'
import { PersonalDataForm } from './PersonalDataForm'

export function ProfileDataCard() {
  const { t } = useTranslation()

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Tabs defaultValue="personalDataForm">
        <Tabs.List>
          <Tabs.Tab value="personalDataForm" icon={<IconUser size={14} />}>
            {t('ProfileView.dataCard.tab.personalData')}
          </Tabs.Tab>

          <Tabs.Tab value="passwordChange" icon={<IconLock size={14} />}>
            {t('ProfileView.dataCard.tab.passwordChange')}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="personalDataForm" pt="lg">
          <PersonalDataForm />
        </Tabs.Panel>

        <Tabs.Panel value="passwordChange" pt="lg">
          <PasswordChangeForm />
        </Tabs.Panel>
      </Tabs>
    </Card>
  )
}
