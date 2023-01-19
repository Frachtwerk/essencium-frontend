import { Navbar } from '@mantine/core'

import { NavLinks } from './components/NavLinks'

type NavBarProps = {
  isOpen: boolean
}

function NavBar({ isOpen }: NavBarProps) {
  return (
    <Navbar hidden={!isOpen} p="md" hiddenBreakpoint="sm" width={{ sm: 220 }}>
      <NavLinks />
    </Navbar>
  )
}

export default NavBar
