import { Navbar } from '@mantine/core'

import { NavLinks } from './components/NavLinks'
import { NavBarProps } from './types'

export function CommonNavBar({ isOpen }: NavBarProps) {
  return (
    <Navbar hidden={!isOpen} p="sm" hiddenBreakpoint="sm" width={{ sm: 170 }}>
      <NavLinks />
    </Navbar>
  )
}
