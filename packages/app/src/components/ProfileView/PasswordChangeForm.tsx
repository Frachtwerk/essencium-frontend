import { Button, Flex, PasswordInput } from '@mantine/core'
import { IconCheck } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

export function PasswordChangeForm() {
  const { t } = useTranslation()
  return (
    <form>
      <Flex
        direction={{ base: 'column', xs: 'column' }}
        gap={{ base: 'sm', xs: 'lg' }}
        align={{ base: 'center', xs: 'flex-start' }}
      >
        <PasswordInput
          placeholder={
            t(
              'ProfileView.dataCard.tabs.passwordChange.content.currentPassword'
            ) as string
          }
          label={t(
            'ProfileView.dataCard.tabs.passwordChange.content.currentPassword'
          )}
          radius="md"
          miw="60%"
          withAsterisk
          mb="md"
        />

        <PasswordInput
          placeholder={
            t(
              'ProfileView.dataCard.tabs.passwordChange.content.newPassword'
            ) as string
          }
          label={t(
            'ProfileView.dataCard.tabs.passwordChange.content.newPassword'
          )}
          radius="md"
          miw="60%"
          withAsterisk
          mb="md"
        />

        <PasswordInput
          placeholder={
            t(
              'ProfileView.dataCard.tabs.passwordChange.content.newPassword'
            ) as string
          }
          label={t(
            'ProfileView.dataCard.tabs.passwordChange.content.newPassword'
          )}
          radius="md"
          mb="md"
          miw="60%"
          withAsterisk
        />

        <Button mt="md" leftIcon={<IconCheck />}>
          {t('ProfileView.dataCard.tabs.passwordChange.content.savePassword')}
        </Button>
      </Flex>
    </form>
  )
}
