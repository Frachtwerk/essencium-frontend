export type HeaderProps = {
  isOpen: boolean
  handleOpenNav: () => void
  logo: JSX.Element
  user: {
    email: string
    firstName: string
    lastName: string
  }
}
