import { Button, Container, Flex, Select, TextInput } from '@mantine/core'
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

        <Container w="45%" p={0} m={0}>
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap={{ base: 'sm', sm: 'lg' }}
            align={{ base: 'center', sm: 'space-evenly' }}
          >
            <Select
              miw="45%"
              mb="md"
              radius="md"
              label={t(
                'ProfileView.dataCard.tabs.personalData.content.language'
              )}
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

            <Select
              mb="md"
              miw="45%"
              radius="md"
              label={t('ProfileView.dataCard.tabs.personalData.content.role')}
              placeholder={
                t(
                  'ProfileView.dataCard.tabs.personalData.content.role'
                ) as string
              }
              value={testUser.role}
              data={[
                { value: 'user', label: 'Nutzer' },
                { value: 'admin', label: 'Administrator' },
              ]}
            />
          </Flex>
        </Container>
      </Flex>
      <Button mt="md" leftIcon={<IconCheck />}>
        Speichern
      </Button>
    </form>
  )
}
