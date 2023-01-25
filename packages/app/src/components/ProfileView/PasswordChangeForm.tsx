import { Button, Flex, PasswordInput } from '@mantine/core'
import { IconCheck } from '@tabler/icons'

export function PasswordChangeForm() {
  return (
    <form>
      <Flex
        direction={{ base: 'column', xs: 'column' }}
        gap={{ base: 'sm', xs: 'lg' }}
        align={{ base: 'center', xs: 'flex-start' }}
      >
        <PasswordInput
          placeholder="Ihr altes Passwort"
          label="Altes Passwort"
          radius="md"
          miw="60%"
          withAsterisk
          mb="md"
        />

        <PasswordInput
          placeholder="Ihr neues Passwort"
          label="Neues Passwort"
          radius="md"
          miw="60%"
          withAsterisk
          mb="md"
        />

        <PasswordInput
          placeholder="Wiederholen Sie Ihr neues Passwort"
          label="Neues Passwort bestätigen"
          radius="md"
          mb="md"
          miw="60%"
          withAsterisk
        />

        <Button mt="md" leftIcon={<IconCheck />}>
          Passwort ändern
        </Button>
      </Flex>
    </form>
  )
}
