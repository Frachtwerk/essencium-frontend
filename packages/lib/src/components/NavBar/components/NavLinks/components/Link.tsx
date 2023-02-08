import { NavLink, useMantineTheme } from '@mantine/core'

import type { LinkProps } from './types'

export function Link({ icon, label, href }: LinkProps): JSX.Element {
  const theme = useMantineTheme()

  return (
    <NavLink
      icon={icon}
      label={label}
      variant="light"
      active={href === window.location.pathname}
      styles={{
        root: {
          borderRadius: theme.radius.sm,
        },
        label: {
          fontSize: theme.fontSizes.sm,
          fontWeight: 500,
        },
      }}
    />
  )
}
