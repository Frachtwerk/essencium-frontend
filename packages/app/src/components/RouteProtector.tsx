import { hasRequiredRights } from '@frachtwerk/essencium-lib'
import { Box, Button, Flex, Title } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'next-i18next'

import { userRightsAtom } from '@/api'
import { getTranslation } from '@/utils'

import { AuthLayout, NAV_LINKS } from './layouts'
import classes from './RouteProtector.module.css'

export function RouteProtector({
  children,
}: {
  children: React.ReactNode
}): JSX.Element | null {
  const pathname = usePathname()

  const router = useRouter()

  const { t } = useTranslation()

  const route = NAV_LINKS.find(navLink => navLink.to === `${pathname}`)

  const userRights = useAtomValue(userRightsAtom)

  const isAuthorized = hasRequiredRights(userRights ?? [], route?.rights ?? [])

  if (isAuthorized) {
    return <Box>{children}</Box>
  }

  return (
    <AuthLayout routeName={getTranslation('profileView.title')}>
      <Flex className={classes['routeProtector']}>
        <Title order={3} className={classes['routeProtector__title']}>
          {t('routeProtector.message')}
        </Title>

        <Button
          variant="light"
          className={classes['routeProtector__backButton']}
          onClick={() => router.push('/')}
        >
          {t('actions.backToHome')}
        </Button>
      </Flex>
    </AuthLayout>
  )
}
