import { Avatar, Badge, Card, Flex, Text, Title } from '@mantine/core'

import { ProfileOverviewCardProps } from '../types'

export function ProfileOverviewCard({
  user,
}: ProfileOverviewCardProps): JSX.Element {
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
          {user.firstName} {user.lastName}
        </Title>

        <Text>{user.role.name}</Text>

        <Badge size="lg"> {user.enabled ? 'active' : 'inactive'} </Badge>
      </Flex>
    </Card>
  )
}
