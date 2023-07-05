import { UserOutput } from '@frachtwerk/essencium-types'
import {
  Avatar,
  Badge,
  Card,
  Flex,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'

type Props = {
  user: UserOutput
}

export function ProfileOverviewCard({ user }: Props): JSX.Element {
  const { t } = useTranslation()
  const theme = useMantineTheme()

  return (
    <Card shadow="sm" p="lg" radius="sm" withBorder>
      <Flex gap="md" justify="center" align="center" direction="column">
        <Avatar
          size="xl"
          radius="xl"
          src={null}
          alt="no image here"
          color={theme.colors.blue[6]}
        >
          <IconUser size={50} />
        </Avatar>

        <Title order={2}>
          {user.firstName} {user.lastName}
        </Title>

        <Text>{user.role.name}</Text>

        <Badge size="lg">
          {user.enabled
            ? t('profileView.overviewCard.active')
            : t('profileView.overviewCard.inactive')}
        </Badge>
      </Flex>
    </Card>
  )
}
