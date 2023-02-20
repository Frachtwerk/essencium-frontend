import { Button, Flex, Select, TextInput } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export function PersonalDataForm(): JSX.Element {
  const { t } = useTranslation()
  const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.de',
    role: 'user',
    language: 'deutsch',
  }

  return (
    <form>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
      >
        <TextInput
          mb="md"
          placeholder={String(
            t('profileView.dataCard.tabs.personalData.content.firstName')
          )}
          label={t('profileView.dataCard.tabs.personalData.content.firstName')}
          size="sm"
          variant="filled"
          miw="45%"
          radius="sm"
          value={testUser.firstName}
        />

        <TextInput
          mb="md"
          placeholder={String(
            t('profileView.dataCard.tabs.personalData.content.lastName')
          )}
          label={t('profileView.dataCard.tabs.personalData.content.lastName')}
          size="sm"
          variant="filled"
          miw="45%"
          radius="sm"
          value={testUser.lastName}
        />
      </Flex>

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
      >
        <TextInput
          mb="md"
          placeholder={String(
            t('profileView.dataCard.tabs.personalData.content.phone')
          )}
          label={t('profileView.dataCard.tabs.personalData.content.phone')}
          size="sm"
          variant="filled"
          miw="45%"
          radius="sm"
        />

        <TextInput
          mb="md"
          placeholder={String(
            t('profileView.dataCard.tabs.personalData.content.mobile')
          )}
          label={t('profileView.dataCard.tabs.personalData.content.mobile')}
          size="sm"
          variant="filled"
          miw="45%"
          radius="sm"
        />
      </Flex>

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
      >
        <TextInput
          mb="md"
          placeholder={String(
            t('profileView.dataCard.tabs.personalData.content.email')
          )}
          label={t('profileView.dataCard.tabs.personalData.content.email')}
          withAsterisk
          size="sm"
          variant="filled"
          radius="sm"
          miw="45%"
          value={testUser.email}
        />

        <Select
          miw="45%"
          mb="md"
          radius="sm"
          label={t('profileView.dataCard.tabs.personalData.content.language')}
          placeholder={String(
            t('profileView.dataCard.tabs.personalData.content.language')
          )}
          value={testUser.language}
          data={[
            { value: 'deutsch', label: 'Deutsch' },
            { value: 'english', label: 'English' },
          ]}
        />
      </Flex>

      <Button mt="md" variant="light">
        {t('profileView.dataCard.tabs.personalData.content.saveChanges')}
      </Button>
    </form>
  )
}
