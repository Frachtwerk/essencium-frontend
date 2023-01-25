import { Avatar, Card, Flex, Text } from '@mantine/core'

export default function ProfileCardSmall() {
  const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.de',
    role: 'user',
    language: 'deutsch',
  }

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Flex
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Avatar
          size="xl"
          radius="xl"
          src={null}
          alt="no image here"
          color="indigo"
        />
        <h2>
          {testUser.firstName} {testUser.lastName}
        </h2>
        <Text>{testUser.role === 'user' ? 'Nutzer' : 'Adminstator'}</Text>
      </Flex>
    </Card>
  )
}
