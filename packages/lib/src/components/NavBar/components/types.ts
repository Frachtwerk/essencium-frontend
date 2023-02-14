export type NavLink = {
  icon: JSX.Element
  label: string
  color: string
  to: string
  description?: string
}

export type NavLinksProps = {
  links: NavLink[]
}
