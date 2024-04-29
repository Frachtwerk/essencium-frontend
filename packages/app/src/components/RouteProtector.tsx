import { Box } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { usePathname, useRouter } from 'next/navigation'

import { userRightsAtom } from '@/api'
import { hasRequiredRights } from '@/utils'

import { NAV_LINKS } from './layouts'

export function RouteProtector({
  children,
}: {
  children: React.ReactNode
}): JSX.Element | null {
  const pathname = usePathname()

  const router = useRouter()

  const route = NAV_LINKS.find(navLink => navLink.to === `${pathname}`)

  const userRights = useAtomValue(userRightsAtom)

  if (hasRequiredRights(userRights ?? [], route?.rights ?? [])) {
    return <Box>{children}</Box>
  }

  if (typeof window !== 'undefined') {
    router.push('/')
  }

  return null
}
