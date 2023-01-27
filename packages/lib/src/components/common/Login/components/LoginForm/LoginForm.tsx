import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { IconEye, IconEyeOff } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

export function LoginForm() {
  const { t } = useTranslation()

  function onVisibilityToggleIcon(reveal: boolean, size: number) {
    return reveal ? <IconEyeOff size={size} /> : <IconEye size={size} />
  }

  return (
    <Paper shadow="xs" p={30} mt="xl" radius="sm">
      <TextInput
        placeholder={t('login.form.emailPlaceholder') as string}
        label={t('login.form.email')}
        required
        styles={{
          label: {
            fontWeight: 900,
          },
        }}
        withAsterisk
      />

      <PasswordInput
        placeholder={t('login.form.passwordPlaceholder') as string}
        label={t('login.form.password')}
        required
        styles={{
          label: {
            fontWeight: 900,
          },
        }}
        withAsterisk
        mt="md"
        visibilityToggleIcon={({ reveal }) =>
          onVisibilityToggleIcon(reveal, 16)
        }
      />

      <Group position="apart" mt="md">
        <Checkbox
          label={t('login.form.rememberLogin')}
          styles={{
            label: {
              fontWeight: 900,
            },
          }}
          color="cyan"
          size="xs"
        />
        <Anchor href="/resetPassword" color="cyan" size="xs" weight={900}>
          {t('login.form.resetPassword')}
        </Anchor>
      </Group>

      <Button fullWidth mt="xl" color="cyan">
        {t('login.form.submit')}
      </Button>
    </Paper>
  )
}
