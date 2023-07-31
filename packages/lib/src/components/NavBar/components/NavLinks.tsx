import { NavLink, UserOutput } from '@frachtwerk/essencium-types'
import {
  NavLink as MantineNavLink,
  Stack,
  useMantineTheme,
} from '@mantine/core'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

type Props = {
  links: NavLink[]
  user?: UserOutput
}

export function NavLinks({ links, user }: Props): JSX.Element {
  const router = useRouter()

  const { t } = useTranslation()

  const theme = useMantineTheme()

  function hasRequiredRights(rights: string[]): boolean {
    return Boolean(
      rights.every(right =>
        user?.role.rights.map(userRight => userRight.authority).includes(right)
      )
    )
  }

  return (
    <Stack spacing="md">
      {links.map(link =>
        !link.rights.length ||
        (link.rights && hasRequiredRights(link.rights)) ? (
          <NextLink
            key={link.label}
            href={link.to}
            style={{ textDecoration: 'none' }}
          >
            <MantineNavLink
              icon={link.icon}
              label={t(link.label)}
              active={link.to === router.pathname}
              styles={{
                root: {
                  borderRadius: theme.radius.sm,
                },
                label: {
                  fontSize: theme.fontSizes.sm,
                },
              }}
            />
          </NextLink>
        ) : null
      )}
    </Stack>
  )
}
