import { Button, Container, Flex, Select, TextInput } from '@mantine/core'
import { IconCheck } from '@tabler/icons'

export function PersonalDataForm() {
  const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.de',
    role: 'user',
    language: 'deutsch',
  }

  return (
    <form>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
      >
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

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
      >
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

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
      >
        <TextInput
          mb="md"
          placeholder="Your Email"
          label="Email"
          withAsterisk
          size="sm"
          variant="filled"
          radius="md"
          miw="45%"
          value={testUser.email}
        />

        <Container w="45%" p={0} m={0}>
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap={{ base: 'sm', sm: 'lg' }}
            align={{ sm: 'space-between' }}
          >
            <Select
              miw="45%"
              mb="md"
              radius="md"
              label="Sprache"
              placeholder="Wählen Sie Ihre Sprache"
              value={testUser.language}
              data={[
                { value: 'deutsch', label: 'Deutsch' },
                { value: 'english', label: 'English' },
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
        </Container>
      </Flex>
      <Button mt="md" leftIcon={<IconCheck />}>
        Speichern
      </Button>
    </form>
  )
}
