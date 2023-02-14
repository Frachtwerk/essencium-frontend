import {
  Flex,
  Footer as MantineFooter,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { IconCopyright } from '@tabler/icons'
import { Link as RouterLink } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import type { FooterLinksProps } from './types'

export function Footer({ links }: FooterLinksProps): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  return (
    <MantineFooter height="sm" p="md">
      <Flex
        justify={{ base: 'center', xs: 'space-between' }}
        direction="row"
        wrap="wrap"
      >
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Flex gap="xs" align="center" ml="xs">
            <IconCopyright size="16" />

            <Text> {t('footer.license')} </Text>
          </Flex>
        </MediaQuery>

        <Flex direction="row" gap="xl">
          {links.map(link => {
            return (
              <RouterLink
                key={link.to}
                to={link.to}
                search={{}}
                params={{}}
                style={{ textDecoration: 'none', color: theme.colors.blue[8] }}
              >
                <Text>{t(link.label)}</Text>
              </RouterLink>
            )
          })}
        </Flex>
      </Flex>
    </MantineFooter>
  )
}
