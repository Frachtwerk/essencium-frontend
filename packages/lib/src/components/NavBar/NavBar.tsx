import { Navbar, NavLink, Stack, useMantineTheme } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import { NavLinks } from './components/NavLinks'
import { NavBarProps } from './types'

export function NavBar({
  isOpen,
  links,
  handleLogout,
}: NavBarProps): JSX.Element {
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
          <NavLinks links={links} />
        </Navbar.Section>

        <Navbar.Section mt="auto">
          <NavLink
            icon={<IconLogout />}
            label={t('navigation.logout')}
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
