import { Button, Flex, MediaQuery, PasswordInput } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export function PasswordChangeForm() {
  const { t } = useTranslation()

  return (
    <form>
      <Flex direction="column" align="flex-start">
        <MediaQuery query="(max-width: 600px)" styles={{ minWidth: '100%' }}>
          <PasswordInput
            placeholder={
              t(
                'profileView.dataCard.tabs.passwordChange.content.currentPassword'
              ) as string
            }
            label={t(
              'profileView.dataCard.tabs.passwordChange.content.currentPassword'
            )}
            radius="md"
            miw="60%"
            withAsterisk
            mb="md"
          />
        </MediaQuery>

        <MediaQuery query="(max-width: 600px)" styles={{ minWidth: '100%' }}>
          <PasswordInput
            placeholder={
              t(
                'profileView.dataCard.tabs.passwordChange.content.newPassword'
              ) as string
            }
            label={t(
              'profileView.dataCard.tabs.passwordChange.content.newPassword'
            )}
            radius="md"
            miw="60%"
            withAsterisk
            mb="md"
          />
        </MediaQuery>

        <MediaQuery query="(max-width: 600px)" styles={{ minWidth: '100%' }}>
          <PasswordInput
            placeholder={
              t(
                'profileView.dataCard.tabs.passwordChange.content.newPassword'
              ) as string
            }
            label={t(
              'profileView.dataCard.tabs.passwordChange.content.newPassword'
            )}
            radius="md"
            mb="md"
            miw="60%"
            withAsterisk
          />
        </MediaQuery>

        <Button mt="md" variant="light">
          {t('profileView.dataCard.tabs.passwordChange.content.savePassword')}
        </Button>
      </Flex>
    </form>
  )
}
