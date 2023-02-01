import { Anchor, Container, Text, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { CommonLoginProps } from './types'

export function CommonLogin({ form: LoginForm }: CommonLoginProps) {
  const { t } = useTranslation()

  return (
    <Container size={450} my={40}>
      <Title align="center" order={2} fw={800}>
        {t('login.title')}
      </Title>

      <Text size="xs" align="center" mt="md">
        {t('login.noAccount')}{' '}
        <Anchor href="" target="" color="cyan" size="xs" fw={600}>
          {t('login.register')}
        </Anchor>
      </Text>

      {LoginForm}
    </Container>
  )
}
