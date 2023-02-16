export type FooterLink = {
  icon?: JSX.Element
  label: string
  to: string
  description?: string
}

export type FooterLinksProps = {
  links: FooterLink[]
}
