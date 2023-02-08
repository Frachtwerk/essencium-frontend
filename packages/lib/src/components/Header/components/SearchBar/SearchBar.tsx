import { Input, Kbd, MediaQuery } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

export function SearchBar(): JSX.Element {
  const { t } = useTranslation()

  return (
    <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
      <Input
        sx={{
          width: '40%',
          display: 'flex',
          alignItems: 'center',
        }}
        icon={<IconSearch size="16" />}
        placeholder={t('header.search')}
        size="md"
        radius="md"
        rightSectionWidth={90}
        rightSection={<Kbd>⌘ + K</Kbd>}
      />
    </MediaQuery>
  )
}
