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

import {
  FeedbackWidget,
  Footer,
  Header,
  NavBar,
} from '@frachtwerk/essencium-lib'
import { FooterLink, NavLink, RIGHTS } from '@frachtwerk/essencium-types'
import { AppShell, AppShellMain, Box, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Spotlight, SpotlightActionData } from '@mantine/spotlight'
import {
  IconHome,
  IconLanguage,
  IconMessage,
  IconSearch,
  IconSectionSign,
  IconShieldHalf,
  IconShieldLock,
  IconUsers,
  IconUserStar,
} from '@tabler/icons-react'
import { useAtom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { i18n, useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'

import { useGetMe, useGetTranslations, userAtom, userRightsAtom } from '@/api'
import { useCreateFeedback } from '@/api/feedback'
import { logout, withBaseStylingShowNotification } from '@/utils'

type Props = {
  children: React.ReactNode
  routeName?: string
  version?: string
}

type SearchItems = {
  icon?: JSX.Element
  label: string
  color?: string
  to: string
  description?: string
  rights?: string[]
}

export const NAV_LINKS: NavLink[] = [
  {
    icon: <IconHome />,
    color: 'blue',
    label: 'navigation.home.label',
    to: '/',
    description: 'navigation.home.description',
    rights: [],
  },
  {
    icon: <IconUsers />,
    color: 'blue',
    label: 'navigation.users.label',
    to: '/users',
    description: 'navigation.users.description',
    rights: [RIGHTS.USER_READ],
  },
  {
    icon: <IconUserStar />,
    color: 'blue',
    label: 'navigation.roles.label',
    to: '/roles',
    description: 'navigation.roles.description',
    rights: [RIGHTS.ROLE_READ, RIGHTS.RIGHT_READ],
  },
  {
    icon: <IconShieldHalf />,
    color: 'blue',
    label: 'navigation.rights.label',
    to: '/rights',
    description: 'navigation.rights.description',
    rights: [RIGHTS.ROLE_READ, RIGHTS.RIGHT_READ],
  },
  {
    icon: <IconLanguage />,
    color: 'blue',
    label: 'navigation.translations.label',
    to: '/translations',
    description: 'navigation.translations.description',
    rights: [RIGHTS.TRANSLATION_READ],
  },
]

export const FOOTER_LINKS: FooterLink[] = [
  {
    label: 'footer.privacy.label',
    icon: <IconShieldLock size={20} />,
    to: '/',
    description: 'footer.privacy.description',
  },
  {
    label: 'footer.imprint.label',
    icon: <IconSectionSign size={20} />,
    to: '/',
    description: 'footer.imprint.description',
  },
  {
    label: 'footer.contact.label',
    icon: <IconMessage size={20} />,
    to: '/contact',
    description: 'footer.contact.description',
  },
]

export const SEARCH_ITEMS: SearchItems[] = [
  ...NAV_LINKS,
  ...FOOTER_LINKS,
  {
    icon: <IconSearch />,
    label: 'profileView.title',
    to: '/profile',
    description: 'profileView.description',
  },
]

const isFixedNavAtom = atomWithStorage('isFixedNav', false)
const isFoldedNavAtom = atomWithStorage('isFoldedNav', true)

export function AuthLayout({
  children,
  routeName,
  version,
}: Props): JSX.Element | null {
  const router = useRouter()

  const theme = useMantineTheme()

  const { t } = useTranslation()

  const [isOpenedNav, setIsOpenedNav] = useState(false)

  const [isFoldedNav, setIsFoldedNav] = useAtom(isFoldedNavAtom)

  const [isFixedNav, setIsFixedNav] = useAtom(isFixedNavAtom)

  function handleOpenNav(): void {
    setIsOpenedNav(opened => !opened)
  }

  const { data: user } = useGetMe()

  const userRights = useAtomValue(userRightsAtom)

  const currentUser = useAtomValue(userAtom)

  const {
    mutate: createFeedback,
    isSuccess: feedbackCreated,
    isError: feedbackFailed,
    isLoading: feedbackSending,
  } = useCreateFeedback()

  const actions: SpotlightActionData[] = SEARCH_ITEMS.filter(link =>
    !link.rights || link.rights?.some(right => userRights?.includes(right))
      ? link
      : null,
  ).map(link => {
    return {
      id: link.label,
      label: t(link.label) as string,
      description: link.description ? (t(link.description) as string) : '',
      onClick: () => router.push(`${link.to}`),
      leftSection: link.icon,
      highlightColor: theme.colors.blue[6],
    }
  })

  const { data: backendTranslationsEn } = useGetTranslations('en')
  const { data: backendTranslationsDe } = useGetTranslations('de')

  i18n?.addResourceBundle(
    i18n.language,
    'common',
    i18n.language === 'de' ? backendTranslationsDe : backendTranslationsEn,
    true,
    true,
  )

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      router.push({
        pathname: '/login',
        query: { redirect: router.asPath },
      })
    }
  }, [user, router])

  useEffect(() => {
    router.replace(router.asPath, undefined, {
      locale: user?.locale,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, user])

  const [showChildren, setShowChildren] = useState(false)

  function isAuthorized(route: NavLink): boolean {
    return (
      !route.rights || route.rights.every(right => userRights?.includes(right))
    )
  }

  function onRouteChangeStart(route: string): void {
    const path = route.replace(/^\/[^/]+/, '')

    const currentRoute = NAV_LINKS.find(link => link.to === path)

    if (currentRoute && !isAuthorized(currentRoute)) {
      setShowChildren(false)
    } else {
      setShowChildren(true)
    }
  }

  function checkIfUserIsAuthorized(route: string): void {
    const path = route.replace(/^\/[^/]+/, '')

    const currentRoute = NAV_LINKS.find(link => link.to === path)

    if (currentRoute && !isAuthorized(currentRoute)) {
      router.replace('/', undefined, {
        locale: user?.locale,
      })
    }
  }

  useEffect(() => {
    router.events.on('routeChangeStart', onRouteChangeStart)
    router.events.on('routeChangeComplete', checkIfUserIsAuthorized)

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart)
      router.events.off('routeChangeComplete', checkIfUserIsAuthorized)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events, userRights])

  function handleLogout(): void {
    logout()

    router.push('/login')
  }

  const pageTitle = `${routeName ? `${routeName} -` : ''} Essencium`

  const isNoPhone = useMediaQuery('(min-width: 48em)')

  function getSidebarMargin(): string {
    if (isFixedNav && isNoPhone) {
      return '250px'
    }
    if (isNoPhone) {
      return '90px'
    }
    return '0px'
  }

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

      <Head>
        <title>{pageTitle}</title>
      </Head>

      <AppShell
        header={{ height: { base: 60 } }}
        footer={{ height: { base: 58 } }}
        navbar={{
          collapsed: { mobile: !isOpenedNav },
          breakpoint: 'sm',
          width: 0,
        }}
        padding={16}
      >
        <Header
          user={user}
          marginLeft={getSidebarMargin()}
          isOpen={isOpenedNav}
          handleOpenNav={handleOpenNav}
        />

        <NavBar
          isOpen={isOpenedNav}
          links={NAV_LINKS}
          userRights={userRights}
          handleLogout={handleLogout}
          version={version}
          foldedNav={isFoldedNav}
          setFoldedNav={setIsFoldedNav}
          fixedNav={isFixedNav}
          setFixedNav={setIsFixedNav}
          logo={
            <Image
              src="/img/web/logotype_400x100px.svg"
              alt={t('header.logo')}
              width={150}
              height={50}
              style={{ verticalAlign: 'initial' }}
            />
          }
          icon={
            <Image
              src="/img/web/emblem_400x400px.svg"
              alt={t('header.logo')}
              width={50}
              height={50}
            />
          }
        />

        <Footer links={FOOTER_LINKS} />

        <AppShellMain>
          <Box
            style={{
              marginLeft: getSidebarMargin(),
            }}
          >
            {showChildren ? children : null}
          </Box>
        </AppShellMain>

        <FeedbackWidget
          currentUser={currentUser}
          createFeedback={createFeedback}
          feedbackCreated={feedbackCreated}
          feedbackFailed={feedbackFailed}
          feedbackSending={feedbackSending}
          createNotification={withBaseStylingShowNotification}
        />
      </AppShell>
    </>
  )
}
