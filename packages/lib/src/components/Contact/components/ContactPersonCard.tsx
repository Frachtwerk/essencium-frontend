import {
  Avatar,
  Card,
  Flex,
  Group,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconLocation,
  IconMail,
  IconPhoneCall,
} from '@tabler/icons-react'
import { t } from 'i18next'

export function ContactPersonCard(): JSX.Element {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Flex
        direction={{ base: 'column', sm: 'column' }}
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'center' }}
        align={{ base: 'center', md: 'flex-start' }}
      >
        <Title order={3}>{t('contactView.contactPersonCard.title')}</Title>

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

        <Flex direction="column" align="flex-start" gap="sm">
          <Group spacing="xl">
            <ThemeIcon radius="md">
              <IconPhoneCall size={16} />
            </ThemeIcon>

            <Text>555 - 5555 5555</Text>
          </Group>

          <Group spacing="xl">
            <ThemeIcon radius="md">
              <IconMail size={16} />
            </ThemeIcon>

            <Text>test@email.de</Text>
          </Group>

          <Group spacing="xl">
            <ThemeIcon radius="md">
              <IconLocation size={16} />
            </ThemeIcon>

            <Text>Teststreet 1, 12345 Testcity</Text>
          </Group>
        </Flex>

        <Group mt="xl">
          <ThemeIcon variant="light" radius="md">
            <IconBrandLinkedin size={15} />
          </ThemeIcon>

          <ThemeIcon variant="light" radius="md">
            <IconBrandFacebook size={15} />
          </ThemeIcon>

          <ThemeIcon variant="light" radius="md">
            <IconBrandInstagram size={15} />
          </ThemeIcon>
        </Group>
      </Flex>
    </Card>
  )
}
