import { Card, Tabs } from '@mantine/core'
import { IconLock, IconUser } from '@tabler/icons'

import PasswordChangeForm from './PasswordChangeForm'
import PersonalDataForm from './PersonalDataForm'

export default function ProfileDataCard() {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Tabs defaultValue="personalDataForm">
        <Tabs.List>
          <Tabs.Tab value="personalDataForm" icon={<IconUser size={14} />}>
            Persönliche Daten
          </Tabs.Tab>
          <Tabs.Tab value="passwordChange" icon={<IconLock size={14} />}>
            Passwort ändern
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
