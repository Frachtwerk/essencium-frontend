import { Container, Title } from '@mantine/core'
import { useTranslation } from 'next-i18next'

type Props = {
  form: JSX.Element
}

export function Login({ form: LoginForm }: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <Container mt="150px">
      <Title align="center" order={2} fw="bold">
        {t('loginView.title')}
      </Title>

      {LoginForm}
    </Container>
  )
}
