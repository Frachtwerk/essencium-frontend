import { Flex, Group, Text, ThemeIcon } from '@mantine/core'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconLocation,
  IconMail,
  IconPhoneCall,
} from '@tabler/icons'

export function ContactPersonContent() {
  return (
    <>
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
    </>
  )
}
