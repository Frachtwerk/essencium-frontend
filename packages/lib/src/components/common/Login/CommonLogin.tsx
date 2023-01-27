import { Anchor, Container, Text, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { LoginForm } from './components/LoginForm/LoginForm'

export function Login() {
  const { t } = useTranslation()

  return (
    <Container size={420} my={40}>
      <Title align="center" order={2} weight={1000}>
        {t('login.title')}
      </Title>

      <Text size="xs" align="center" mt="sm">
        {t('login.noAccount')}
        <Anchor href="" target="" color="cyan" size="xs" weight={900}>
          {t('login.register')}
        </Anchor>
      </Text>

      <LoginForm />
    </Container>
  )
}
