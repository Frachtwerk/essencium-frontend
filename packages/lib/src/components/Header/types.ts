export type HeaderProps = {
  isOpen: boolean
  handleOpenNav: () => void
  logo: JSX.Element
  version?: string
  user: {
    email: string
    firstName: string
    lastName: string
  } | null
}
