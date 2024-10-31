'use client'

import { hasRequiredRights } from '@frachtwerk/essencium-lib'
import { Box, Button, Flex, Title } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { userRightsAtom } from '@/api'
import { i18nConfig } from '@/config'

import { AuthLayout, NAV_LINKS } from './layouts'
import classes from './RouteProtector.module.css'

export function RouteProtector({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}): JSX.Element | null {
  const pathname = usePathname()

  const router = useRouter()

  const { t } = useTranslation()

  const { locale } = params

  const pathnameToFind =
    locale === i18nConfig.defaultLocale
      ? pathname
      : `/${pathname.split(`/${locale}/`)[1]}`

  const route = NAV_LINKS.find(navLink => navLink.to === pathnameToFind)

  const userRights = useAtomValue(userRightsAtom)

  const isAuthorized = hasRequiredRights(userRights ?? [], route?.rights ?? [])

  if (isAuthorized) {
    return <Box>{children}</Box>
  }

  return (
    <AuthLayout>
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
