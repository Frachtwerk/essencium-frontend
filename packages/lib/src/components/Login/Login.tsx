import { Anchor, Container, Text, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import type { LoginProps } from './types'

export function Login({ form: LoginForm }: LoginProps): JSX.Element {
  const { t } = useTranslation()

  return (
    <Container size={450} my="xl">
      <Title align="center" order={2} fw="bold">
        {t('login.title')}
      </Title>

      <Text size="xs" align="center" mt="md">
        {t('login.noAccount')}{' '}
        <Anchor href="" target="" color="cyan" size="xs" fw="bold">
          {t('login.register')}
        </Anchor>
      </Text>

      {LoginForm}
    </Container>
  )
}
