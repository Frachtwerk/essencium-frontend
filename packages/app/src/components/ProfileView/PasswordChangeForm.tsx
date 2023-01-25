import { Button, PasswordInput } from '@mantine/core'
import { IconCheck } from '@tabler/icons'

export default function PasswordChangeForm() {
  return (
    <form>
      <PasswordInput
        placeholder="Ihr altes Passwort"
        label="Altes Passwort"
        radius="md"
        maw="60%"
        withAsterisk
        mb="md"
      />
      <PasswordInput
        placeholder="Ihr neues Passwort"
        label="Neues Passwort"
        radius="md"
        maw="60%"
        withAsterisk
        mb="md"
      />
      <PasswordInput
        placeholder="Wiederholen Sie Ihr neues Passwort"
        label="Neues Passwort bestätigen"
        radius="md"
        mb="md"
        maw="60%"
        withAsterisk
      />

      <Button uppercase mt="md" leftIcon={<IconCheck />}>
        Speichern
      </Button>
    </form>
  )
}
