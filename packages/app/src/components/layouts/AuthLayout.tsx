/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

'use client'

import {
  FeedbackWidget,
  Footer,
  hasRequiredRights,
  Header,
  LoadingSpinner,
  NavBar,
} from '@frachtwerk/essencium-lib'
import { NavLink, RIGHTS } from '@frachtwerk/essencium-types'
import { AppShell, AppShellMain, AppShellProps } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Spotlight, SpotlightActionData } from '@mantine/spotlight'
import {
  IconHome,
  IconLanguage,
  IconMessage,
  IconSearch,
  IconSectionSign,
  IconSettings,
  IconShieldHalf,
  IconShieldLock,
  IconUsers,
  IconUserStar,
} from '@tabler/icons-react'
import { useAtom, useSetAtom } from 'jotai'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { type JSX, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetMe, userAtom, userRightsAtom } from '@/api'
import { useCreateFeedback } from '@/api/feedback'
import { theme } from '@/config'
import { useAddTranslations } from '@/hooks'
import {
  isBrowserEnvironment,
  logout,
  withBaseStylingShowNotification,
} from '@/utils'

import packageJson from '../../../package.json'
import classes from './AuthLayout.module.css'

const version = packageJson?.version ? packageJson.version : undefined

const environment =
  isBrowserEnvironment() && !process.env.NEXT_PUBLIC_DISABLE_INSTRUMENTATION
    ? window?.runtimeConfig?.optional?.APP_ENV
    : undefined

type Props = AppShellProps & {
  children: React.ReactNode
}

export const NAV_LINKS: NavLink[] = [
  {
    icon: <IconHome />,
    color: theme.primaryColor,
    label: 'navigation.home.label',
    to: '/',
    description: 'navigation.home.description',
    rights: [],
  },
  {
    icon: <IconSettings />,
    color: theme.primaryColor,
    label: 'navigation.administration.label',
    to: '/admin',
    rights: [
      [
        RIGHTS.USER_READ,
        RIGHTS.ROLE_READ,
        RIGHTS.RIGHT_READ,
        RIGHTS.TRANSLATION_READ,
      ],
    ],
    prefetch: false,
    navLinks: [
      {
        icon: <IconUsers />,
        color: theme.primaryColor,
        label: 'navigation.users.label',
        to: '/users',
        description: 'navigation.users.description',
        rights: [RIGHTS.USER_READ],
      },
      {
        icon: <IconUserStar />,
        color: theme.primaryColor,
        label: 'navigation.roles.label',
        to: '/roles',
        description: 'navigation.roles.description',
        rights: [RIGHTS.ROLE_READ, RIGHTS.RIGHT_READ],
      },
      {
        icon: <IconShieldHalf />,
        color: theme.primaryColor,
        label: 'navigation.rights.label',
        to: '/rights',
        description: 'navigation.rights.description',
        rights: [RIGHTS.ROLE_READ, RIGHTS.RIGHT_READ],
      },
      {
        icon: <IconLanguage />,
        color: theme.primaryColor,
        label: 'navigation.translations.label',
        to: '/translations',
        description: 'navigation.translations.description',
        rights: [RIGHTS.TRANSLATION_READ],
      },
    ],
  },
]

export const FOOTER_LINKS: NavLink[] = [
  {
    icon: <IconShieldLock size={20} />,
    color: theme.primaryColor,
    label: 'privacyPolicyView.title',
    to: '/privacy-policy',
    rights: [],
  },
  {
    color: theme.primaryColor,
    label: 'legalNoticeView.title',
    icon: <IconSectionSign size={20} />,
    to: '/legal-notice',
    rights: [],
  },
  {
    icon: <IconMessage size={20} />,
    color: theme.primaryColor,
    label: 'footer.contact.label',
    to: '/contact',
    description: 'footer.contact.description',
    rights: [],
  },
]

export const SEARCH_ITEMS: NavLink[] = [
  {
    icon: <IconSearch />,
    label: 'profileView.title',
    color: theme.primaryColor,
    to: '/profile',
    description: 'profileView.description',
    rights: [],
  },
  ...NAV_LINKS,
  ...FOOTER_LINKS,
]

export function AuthLayout({ children, ...props }: Props): JSX.Element | null {
  const router = useRouter()

  const { t, i18n } = useTranslation()

  const [mobileNavBarOpened, { toggle: toggleMobileNavBar }] = useDisclosure()

  const [isFoldedNav, setIsFoldedNav] = useState(true)

  const [isFixedNav, setIsFixedNav] = useState(false)

  const { data: user } = useGetMe()

  const setUser = useSetAtom(userAtom)

  const [userRights, setUserRights] = useAtom(userRightsAtom)

  const addTranslations = useAddTranslations(i18n)

  useEffect(() => {
    if (user) {
      setUser(user)

      setUserRights(
        user.roles.flatMap(role => role.rights.map(right => right.authority)),
      )
    }
  }, [user, setUserRights, setUser])

  const {
    mutate: createFeedback,
    isSuccess: feedbackCreated,
    isError: feedbackFailed,
    isPending: feedbackSending,
  } = useCreateFeedback()

  const actions: SpotlightActionData[] = SEARCH_ITEMS.filter(link =>
    !link.rights?.length || hasRequiredRights(userRights ?? [], link.rights)
      ? link
      : null,
  ).flatMap(link => {
    if (link.navLinks?.length) {
      return link.navLinks
        .filter(navLink => hasRequiredRights(userRights ?? [], navLink.rights))
        .map(navLink => ({
          id: navLink.label,
          label: t(navLink.label) as string,
          description: navLink.description
            ? (t(navLink.description) as string)
            : '',
          onClick: () => router.push(`${link.to}/${navLink.to}`),
          leftSection: navLink.icon,
        }))
    }

    return {
      id: link.label,
      label: t(link.label) as string,
      description: link.description ? (t(link.description) as string) : '',
      onClick: () => router.push(`${link.to}`),
      leftSection: link.icon,
    }
  })

  const [isLoadingAuthToken, setIsLoadingAuthToken] = useState(true)

  const path = usePathname()

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      router.push(`/login${path === '/' ? '' : `?redirect=${path}`}`)
    } else {
      setIsLoadingAuthToken(false)
    }
  }, [user, router, path])

  function handleLogout(): void {
    logout()

    router.push('/login')
  }

  const isNotMobile = useMediaQuery('(min-width: 48em)') // equals mantine breakpoint sm

  const currentLocale = i18n.language
  const pathname = usePathname()

  useEffect(() => {
    // Check if the user's locale is different from the current locale

    if (user?.locale && currentLocale !== user?.locale) {
      const days = 30
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      const expires = date.toUTCString()
      document.cookie = `NEXT_LOCALE=${user?.locale};expires=${expires};path=/`

      i18n.changeLanguage(user?.locale)

      if (pathname.includes(currentLocale)) {
        router.push(pathname.replace(`/${currentLocale}`, `/${user?.locale}`))
      } else {
        router.push(pathname.replace(`/`, `/${user?.locale}/`))
      }

      router.refresh()
    }
  }, [pathname, user, router, currentLocale, i18n])

  useEffect(() => {
    addTranslations()
  }, [currentLocale, addTranslations])

  useEffect(() => {
    if (!isFixedNav) {
      if (!isNotMobile) {
        setIsFoldedNav(false)
      } else {
        setIsFoldedNav(true)
      }
    }
  }, [isFixedNav, isNotMobile])

  return (
    <>
      <Spotlight
        actions={actions}
        searchProps={{
          leftSection: <IconSearch />,
          placeholder: t('header.spotlight.placeholder') as string,
        }}
        highlightQuery
        nothingFound={t('header.spotlight.nothingFound') as string}
      />

      {!isLoadingAuthToken ? (
        <AppShell
          layout={isNotMobile ? 'alt' : 'default'}
          header={{ height: { base: 60 } }}
          footer={{ height: { base: 58 } }}
          navbar={{
            width: isFixedNav ? 250 : 80,
            breakpoint: 'sm',
            collapsed: { mobile: !mobileNavBarOpened },
          }}
          className={classes['app-shell']}
          {...props}
        >
          <Header
            user={user}
            isOpen={mobileNavBarOpened}
            handleOpenNav={toggleMobileNavBar}
            environment={environment}
          />

          <NavBar
            isMobile={!isNotMobile}
            links={NAV_LINKS}
            userRights={userRights}
            handleLogout={handleLogout}
            foldedNav={isFoldedNav}
            setFoldedNav={setIsFoldedNav}
            fixedNav={isFixedNav}
            setFixedNav={setIsFixedNav}
            handleOpenNav={toggleMobileNavBar}
            icon={
              <Image
                src="/img/web/emblem_400x400px.svg"
                alt={t('header.logo')}
                width={50}
                height={50}
              />
            }
          />

          <Footer
            links={FOOTER_LINKS}
            version={version}
            h={isNotMobile ? '60px' : '90px'}
          >
            {user ? (
              <FeedbackWidget
                currentUser={user}
                createFeedback={createFeedback}
                feedbackCreated={feedbackCreated}
                feedbackFailed={feedbackFailed}
                feedbackSending={feedbackSending}
                createNotification={withBaseStylingShowNotification}
              />
            ) : null}
          </Footer>

          <AppShellMain className={classes['app-shell-main']}>
            {children}
          </AppShellMain>
        </AppShell>
      ) : (
        <LoadingSpinner show />
      )}
    </>
  )
}
