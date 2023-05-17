import { UserOutput } from '@frachtwerk/types'
import { Avatar, Badge, Card, Flex, Text, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'

type Props = {
  user: UserOutput
}

export function ProfileOverviewCard({ user }: Props): JSX.Element {
  const { t } = useTranslation()

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

        <Badge size="lg">
          {user.enabled
            ? t('profileView.overviewCard.active')
            : t('profileView.overviewCard.inactive')}
        </Badge>
      </Flex>
    </Card>
  )
}
