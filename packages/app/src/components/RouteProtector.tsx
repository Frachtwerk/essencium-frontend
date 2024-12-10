'use client'

import { hasRequiredRights } from '@frachtwerk/essencium-lib'
import { NavLink } from '@frachtwerk/essencium-types'
import { Box, Button, Flex, Title } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { userRightsAtom } from '@/api'
import { i18nConfig } from '@/config'

import { AuthLayout, NAV_LINKS } from './layouts'
import classes from './RouteProtector.module.css'

type Props = {
  children: React.ReactNode
  params: { locale: string }
  rights?: string[]
}

/**
 * This Route Protector component is used to protect any routes that it is wrapped around.
 * It checks if the user has the required rights to access the route depending on the rights array inside NAV_LINKS
 * If the prop 'rights' is given, it will check for the rights given in the prop and not the rights in NAV_LINKS
 *
 * This allows flexibility to protect routes based on the NAV_LINKS or based on an abitrary rights array via prop
 */
export function RouteProtector({
  children,
  params,
  rights = [],
}: Props): JSX.Element | null {
  const pathname = usePathname()

  const router = useRouter()

  const { t } = useTranslation()

  const { locale } = params

  const errorScreen = (
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

  const userRights = useAtomValue(userRightsAtom)

  if (rights.length) {
    const isAuthorized: boolean = hasRequiredRights(userRights ?? [], rights)

    if (!isAuthorized) {
      return errorScreen
    }
  }

  /**
   * the locale is not included in this variable
   * i.e. /base-data/countries
   */
  const pathnameWithoutLocale =
    locale === i18nConfig.defaultLocale
      ? pathname
      : `/${pathname.split(`/${locale}/`)[1]}`

  /**
   * path segments as array of strings without slashes
   * i.e. ['base-data', 'countries']
   */
  const pathnameSegments: string[] = pathnameWithoutLocale
    .split('/')
    .filter(Boolean)

  const rootPathName: string = `/${pathnameSegments[0]}`
  const subPathName: string | undefined = pathnameSegments?.[1]
    ? `/${pathnameSegments?.[1]}`
    : undefined

  // children of root nav item inside the 'navLinks' array if exists
  const rootPath: NavLink | undefined = NAV_LINKS.find(
    navLink => navLink.to === rootPathName,
  )

  const rootPathSubNavLinks: NavLink[] | undefined = rootPath?.navLinks

  // find route inside the 'navLinks' array of root nav item and fallback to root nav item
  const navItemToVisit: NavLink | undefined =
    rootPathSubNavLinks?.find(navLink => navLink.to === subPathName) ?? rootPath

  const isAuthorized: boolean = hasRequiredRights(
    userRights ?? [],
    navItemToVisit?.rights ?? [],
  )

  if (isAuthorized) {
    return <Box>{children}</Box>
  }

  return errorScreen
}
