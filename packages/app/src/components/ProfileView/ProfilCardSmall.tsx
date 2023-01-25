import { Card, Flex, Text } from '@mantine/core'
import { Avatar } from '@mantine/core'

export default function ProfileCardSmall() {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Flex
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Avatar src={null} alt="no image here" color="indigo" />
        <h2>John Doe</h2>
        <Text>Nutzer</Text>
      </Flex>
    </Card>
  )
}
