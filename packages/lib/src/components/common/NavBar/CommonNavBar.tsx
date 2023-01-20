import { Navbar } from '@mantine/core'

import { NavLinks } from './components/NavLinks'
import { NavBarProps } from './types'

export function CommonNavBar({ isOpen }: NavBarProps) {
  return (
    <Navbar hidden={!isOpen} p="md" hiddenBreakpoint="sm" width={{ sm: 220 }}>
      <NavLinks />
    </Navbar>
  )
}
