import {
  Group,
  Kbd,
  MediaQuery,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { openSpotlight } from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

export function SearchBar(): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  return (
    <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
      <UnstyledButton
        sx={{
          width: '35%',
          border: '1px solid',
          borderColor:
            theme.colorScheme === 'dark'
              ? theme.colors.gray[7]
              : theme.colors.gray[3],
          borderRadius: theme.radius.sm,
          padding: '5px 10px',
        }}
        onClick={() => openSpotlight()}
      >
        <Group position="apart">
          <Group>
            <IconSearch size="16" color={theme.colors.gray[4]} />

            <Text color={theme.colors.gray[5]}>
              {t('header.spotlight.placeholder')}
            </Text>
          </Group>

          <Kbd>⌘ + K</Kbd>
        </Group>
      </UnstyledButton>
    </MediaQuery>
  )
}
