import {
  Navbar,
  NavLink as MantineNavLink,
  Stack,
  useMantineTheme,
} from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { NavLink, UserOutput } from 'types'

import { NavLinks } from './components'

type Props = {
  isOpen: boolean
  links: NavLink[]
  user?: UserOutput
  handleLogout: () => void
}

export function NavBar({
  isOpen,
  links,
  user,
  handleLogout,
}: Props): JSX.Element {
  const theme = useMantineTheme()

  const { t } = useTranslation()

  return (
    <Navbar
      hidden={!isOpen}
      p="sm"
      hiddenBreakpoint="sm"
      width={{ sm: 180 }}
      styles={{ root: { maxWidth: 'min-content' } }}
      fixed
    >
      <Stack
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Navbar.Section grow>
          <NavLinks links={links} user={user} />
        </Navbar.Section>

        <Navbar.Section mt="auto">
          <MantineNavLink
            icon={<IconLogout />}
            label={t('navigation.logout.label')}
            onClick={() => handleLogout()}
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
        </Navbar.Section>
      </Stack>
    </Navbar>
  )
}
