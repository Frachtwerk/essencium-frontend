import { Navbar } from '@mantine/core'

import { NavLinks } from './components/NavLinks'

type NavBarProps = {
  isOpen: boolean
}

export function CommonNavBar({ isOpen }: NavBarProps) {
  return (
    <Navbar hidden={!isOpen} p="md" hiddenBreakpoint="sm" width={{ sm: 220 }}>
      <NavLinks />
    </Navbar>
  )
}
