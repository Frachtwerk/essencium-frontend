import { Avatar, Card, Flex, Title } from '@mantine/core'

import { ContactPersonContent } from './components/ContactPersonContent'

export function ContactPersonCard() {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Flex
        direction={{ base: 'column', sm: 'column' }}
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'center' }}
        align={{ base: 'center', md: 'flex-start' }}
      >
        <Title order={3}>Your Contact Person</Title>

        <Avatar
          size="xl"
          radius="xl"
          mt="xs"
          src={null}
          alt="no image here"
          color="indigo"
        />

        <Title order={5} mb="sm" mt="sm">
          Firstname Lastname
        </Title>

        <ContactPersonContent />
      </Flex>
    </Card>
  )
}
