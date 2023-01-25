import { TextInput, Select, Flex, Button } from '@mantine/core'
import { useState } from 'react'
import { Switch, useMantineTheme } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'

export default function PersonalDataForm() {
  const theme = useMantineTheme()
  const [checked, setChecked] = useState(false)
  const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.de',
    role: 'user',
    language: 'deutsch',
  }

  return (
    <form>
      <Flex gap="md" justify="space-between">
        <TextInput
          mb="md"
          placeholder="Your Email"
          label="Email"
          withAsterisk
          size="sm"
          variant="filled"
          miw="45%"
          radius="md"
          value={testUser.email}
        />
        <Switch
          mt="lg"
          mb="md"
          checked={checked}
          onChange={event => setChecked(event.currentTarget.checked)}
          color="teal"
          size="md"
          label={checked ? 'aktiv' : 'inaktiv'}
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
                color={theme.colors.red[theme.fn.primaryShade()]}
                stroke={3}
              />
            )
          }
        />
      </Flex>
      <Flex gap="md" justify="space-between">
        <TextInput
          mb="md"
          placeholder="Vorname"
          label="Vorname"
          size="sm"
          variant="filled"
          miw="45%"
          radius="md"
          value={testUser.firstName}
        />
        <TextInput
          mb="md"
          placeholder="Nachname"
          label="Nachname"
          size="sm"
          variant="filled"
          miw="45%"
          radius="md"
          value={testUser.lastName}
        />
      </Flex>
      <Flex gap="md" justify="space-between">
        <TextInput
          mb="md"
          placeholder="Telefon"
          label="Telefon"
          size="sm"
          variant="filled"
          miw="45%"
          radius="md"
        />
        <TextInput
          mb="md"
          placeholder="Mobil"
          label="Mobil"
          size="sm"
          variant="filled"
          miw="45%"
          radius="md"
        />
      </Flex>
      <Flex gap="md" justify="space-between">
        <Select
          mb="md"
          miw="45%"
          radius="md"
          label="Sprache"
          placeholder="Wählen Sie Ihre Sprache"
          value={testUser.language}
          data={[
            { value: 'deutsch', label: 'deutsch' },
            { value: 'english', label: 'english' },
          ]}
        />
        <Select
          mb="md"
          miw="45%"
          radius="md"
          label="Rolle"
          placeholder="Wählen Sie Ihre Rolle"
          value={testUser.role}
          data={[
            { value: 'user', label: 'Nutzer' },
            { value: 'admin', label: 'Administrator' },
          ]}
        />
      </Flex>
      <Button uppercase mt="md" leftIcon={<IconCheck />}>
        Speichern
      </Button>
    </form>
  )
}
