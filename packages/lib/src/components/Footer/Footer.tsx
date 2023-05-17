import { FooterLink } from '@frachtwerk/types'
import {
  Flex,
  Footer as MantineFooter,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { IconCopyright } from '@tabler/icons-react'
import { Link as RouterLink } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

type Props = {
  links: FooterLink[]
}

export function Footer({ links }: Props): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  return (
    <MantineFooter height={{ base: 58 }} p="md" fixed>
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
          {links.map(link => (
            <RouterLink
              key={link.label}
              to={link.to}
              search={{}}
              params={{}}
              style={{
                textDecoration: 'none',
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.gray[4]
                    : theme.colors.dark[9],
              }}
            >
              <Text>{t(link.label)}</Text>
            </RouterLink>
          ))}
        </Flex>
      </Flex>
    </MantineFooter>
  )
}
