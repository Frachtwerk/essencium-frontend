import { Avatar, Badge, Card, Flex, Text, Title } from '@mantine/core'

export function ProfileOverviewCard(): JSX.Element {
  const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.de',
    role: 'user',
    language: 'deutsch',
    status: 'active',
  }

  return (
    <Card shadow="sm" p="lg" radius="sm" withBorder>
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

        <Text> {testUser.role} </Text>

        <Badge size="lg"> {testUser.status} </Badge>
      </Flex>
    </Card>
  )
}
