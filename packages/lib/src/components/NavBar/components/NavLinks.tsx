import { NavLink, Stack, useMantineTheme } from '@mantine/core'
import { Link as RouterLink } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { NavLinksProps } from './types'

export function NavLinks({ links }: NavLinksProps): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  return (
    <Stack spacing="md">
      {links.map(link => (
        <RouterLink
          key={link.label}
          to={link.to}
          search={{}}
          params={{}}
          style={{ textDecoration: 'none' }}
        >
          <NavLink
            icon={link.icon}
            label={t(link.label)}
            active={link.to === window.location.pathname}
            styles={{
              root: {
                borderRadius: theme.radius.sm,
              },
              label: {
                fontSize: theme.fontSizes.sm,
                fontWeight: 450,
              },
            }}
          />
        </RouterLink>
      ))}
    </Stack>
  )
}
