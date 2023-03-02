import { NavLink } from './components'

export type NavBarProps = {
  isOpen: boolean
  links: NavLink[]
  handleLogout: () => void
}
