export type NavLink = {
  icon: JSX.Element
  label: string
  color: string
  to: string
}

export type NavLinksProps = {
  links: NavLink[]
}
