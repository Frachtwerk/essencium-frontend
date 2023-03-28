import {
  NavLink as MantineNavLink,
  Stack,
  useMantineTheme,
} from '@mantine/core'
import { Link as RouterLink } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'types'

type Props = {
  links: NavLink[]
}

export function NavLinks({ links }: Props): JSX.Element {
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
          <MantineNavLink
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
