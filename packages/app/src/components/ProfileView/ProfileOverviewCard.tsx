import { Avatar, Badge, Card, Flex, Text, Title } from '@mantine/core'

export function ProfileOverviewCard() {
  const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.de',
    role: 'user',
    language: 'deutsch',
  }

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Flex gap="md" justify="center" align="center" direction="column">
        <Avatar
          size="xl"
          radius="xl"
          src={null}
          alt="no image here"
          color="indigo"
        />

        <Title order={2}>
          {testUser.firstName} {testUser.lastName}
        </Title>

        <Text>{testUser.role === 'user' ? 'Nutzer' : 'Adminstator'}</Text>

        <Badge size="lg">active</Badge>
      </Flex>
    </Card>
  )
}
