import { Button, Center, Stack, Text, Title } from '@mantine/core'
import { Link as Routerlink } from '@tanstack/react-router'
import { t } from 'i18next'

export function SetPasswordSuccessMessage(): JSX.Element {
  return (
    <Center>
      <Stack>
        <Title order={4} mb="md">
          {t('setPasswordView.successMessage.title')}
        </Title>

        <Text size="sm">{t('setPasswordView.successMessage.text')}</Text>

        <Routerlink
          to="/login"
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <Button mt="md" fullWidth>
            {t('setPasswordView.successMessage.button')}
          </Button>
        </Routerlink>
      </Stack>
    </Center>
  )
}
