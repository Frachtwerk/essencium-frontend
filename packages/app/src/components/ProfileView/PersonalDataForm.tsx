import { Button, Flex, Select, TextInput } from '@mantine/core'
import { IconCheck } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

export function PersonalDataForm() {
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
          placeholder={
            t(
              'ProfileView.dataCard.tabs.personalData.content.firstName'
            ) as string
          }
          label={t('ProfileView.dataCard.tabs.personalData.content.firstName')}
          size="sm"
          variant="filled"
          miw="45%"
          radius="md"
          value={testUser.firstName}
        />

        <TextInput
          mb="md"
          placeholder={
            t(
              'ProfileView.dataCard.tabs.personalData.content.lastName'
            ) as string
          }
          label={t('ProfileView.dataCard.tabs.personalData.content.lastName')}
          size="sm"
          variant="filled"
          miw="45%"
          radius="md"
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
          placeholder={
            t('ProfileView.dataCard.tabs.personalData.content.phone') as string
          }
          label={t('ProfileView.dataCard.tabs.personalData.content.phone')}
          size="sm"
          variant="filled"
          miw="45%"
          radius="md"
        />

        <TextInput
          mb="md"
          placeholder={
            t('ProfileView.dataCard.tabs.personalData.content.mobile') as string
          }
          label={t('ProfileView.dataCard.tabs.personalData.content.mobile')}
          size="sm"
          variant="filled"
          miw="45%"
          radius="md"
        />
      </Flex>

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
      >
        <TextInput
          mb="md"
          placeholder={
            t('ProfileView.dataCard.tabs.personalData.content.email') as string
          }
          label={t('ProfileView.dataCard.tabs.personalData.content.email')}
          withAsterisk
          size="sm"
          variant="filled"
          radius="md"
          miw="45%"
          value={testUser.email}
        />

        <Select
          miw="45%"
          mb="md"
          radius="md"
          label={t('ProfileView.dataCard.tabs.personalData.content.language')}
          placeholder={
            t(
              'ProfileView.dataCard.tabs.personalData.content.language'
            ) as string
          }
          value={testUser.language}
          data={[
            { value: 'deutsch', label: 'Deutsch' },
            { value: 'english', label: 'English' },
          ]}
        />
      </Flex>

      <Button mt="md" leftIcon={<IconCheck />}>
        Speichern
      </Button>
    </form>
  )
}
