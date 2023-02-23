import { Navbar } from '@mantine/core'

import { NavLinks } from './components/NavLinks'
import { NavBarProps } from './types'

export function NavBar({ isOpen, links }: NavBarProps): JSX.Element {
  return (
    <Navbar
      hidden={!isOpen}
      p="sm"
      hiddenBreakpoint="sm"
      width={{ sm: 170 }}
      fixed
    >
      <NavLinks links={links} />
    </Navbar>
  )
}
