import { Navbar } from '@mantine/core'

import { NavLinks } from './components/NavLinks'
import type { NavBarProps } from './types'

export function NavBar({ isOpen }: NavBarProps): JSX.Element {
  return (
    <Navbar hidden={!isOpen} p="sm" hiddenBreakpoint="sm" width={{ sm: 170 }}>
      <NavLinks />
    </Navbar>
  )
}
