import {
  NavLink as MantineNavLink,
  Stack,
  useMantineTheme,
} from '@mantine/core'
import { Link as RouterLink } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { NavLink, UserOutput } from 'types'

type Props = {
  links: NavLink[]
  user?: UserOutput
}

export function NavLinks({ links, user }: Props): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  function hasRequiredRights(rights: string[]): boolean {
    return Boolean(
      rights.every(right =>
        user?.role.rights.map(userRight => userRight.name).includes(right)
      )
    )
  }

  return (
    <Stack spacing="md">
      {links.map(link =>
        !link.rights.length ||
        (link.rights && hasRequiredRights(link.rights)) ? (
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
        ) : null
      )}
    </Stack>
  )
}
