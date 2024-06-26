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
  LoadingSpinner,
  NavBar,
} from '@frachtwerk/essencium-lib'
import { FooterLink, NavLink, RIGHTS } from '@frachtwerk/essencium-types'
import { AppShell, AppShellMain, AppShellProps } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
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
import { useAtom, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'

import { useGetMe, userAtom, userRightsAtom } from '@/api'
import { useCreateFeedback } from '@/api/feedback'
import {
  getTranslation,
  logout,
  withBaseStylingShowNotification,
} from '@/utils'

import classes from './AuthLayout.module.css'

type Props = AppShellProps & {
  children: React.ReactNode
  routeName?: string
  version?: string
}

type SearchItems = {
  icon?: JSX.Element
  label: string
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
  {
    icon: <IconSearch />,
    label: 'profileView.title',
    to: '/profile',
    description: 'profileView.description',
    rights: [],
  },
  ...NAV_LINKS,
  ...FOOTER_LINKS,
]

const isFixedNavAtom = atomWithStorage('isFixedNav', false)
const isFoldedNavAtom = atomWithStorage('isFoldedNav', true)

export function AuthLayout({
  children,
  routeName,
  version,
  ...props
}: Props): JSX.Element | null {
  const router = useRouter()

  const { t } = useTranslation()

  const [mobileNavBarOpened, { toggle: toggleMobileNavBar }] = useDisclosure()

  const [isFoldedNav, setIsFoldedNav] = useAtom(isFoldedNavAtom)

  const [isFixedNav, setIsFixedNav] = useAtom(isFixedNavAtom)

  const { data: user } = useGetMe()

  const setUser = useSetAtom(userAtom)
  const [userRights, setUserRights] = useAtom(userRightsAtom)

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
    !link.rights?.length ||
    link.rights?.some(right => userRights?.includes(right))
      ? link
      : null,
  ).map(link => {
    return {
      id: link.label,
      label: t(link.label) as string,
      description: link.description ? (t(link.description) as string) : '',
      onClick: () => router.push(`${link.to}`),
      leftSection: link.icon,
    }
  })

  const [isLoadingAuthToken, setIsLoadingAuthToken] = useState(true)

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      router.push({
        pathname: '/login',
        query: router.asPath === '/' ? null : { redirect: router.asPath },
      })
    } else {
      setIsLoadingAuthToken(false)
    }
  }, [user, router])

  function handleLogout(): void {
    logout()

    router.push('/login')
  }

  const pageTitle = `${routeName ? `${routeName} -` : ''} ${getTranslation(
    'header.title',
  )}`

  const isNotMobile = useMediaQuery('(min-width: 48em)') // equals mantine breakpoint sm

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
          />

          <NavBar
            isMobile={!isNotMobile}
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

          <Footer links={FOOTER_LINKS}>
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

          <AppShellMain>{children}</AppShellMain>

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
        </AppShell>
      ) : (
        <LoadingSpinner show />
      )}
    </>
  )
}
