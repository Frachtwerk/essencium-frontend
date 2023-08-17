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

import { Footer, Header, logout, NavBar } from '@frachtwerk/essencium-lib'
import { FooterLink, NavLink, RIGHTS } from '@frachtwerk/essencium-types'
import { AppShell, useMantineTheme } from '@mantine/core'
import type { SpotlightAction } from '@mantine/spotlight'
import { SpotlightProvider } from '@mantine/spotlight'
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
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { i18n, useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'

import { useGetTranslations } from '@/api'
import { useGetMe } from '@/api/me'

import packageJson from '../../../package.json'

type Props = {
  children: React.ReactNode
  routeName?: string
}

type SearchItems = {
  icon?: JSX.Element
  label: string
  color?: string
  to: string
  description?: string
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

function AuthLayout({ children, routeName }: Props): JSX.Element | null {
  const router = useRouter()

  const theme = useMantineTheme()

  const { t } = useTranslation()

  const [openedNav, setOpenedNav] = useState(false)

  function handleOpenNav(): void {
    setOpenedNav(opened => !opened)
  }

  const { data: user } = useGetMe()

  const actions: SpotlightAction[] = SEARCH_ITEMS.map(link => {
    return {
      title: t(link.label),
      description: link.description ? (t(link.description) as string) : '',
      onTrigger: () => router.push(`${link.to}`),
      icon: link.icon,
    }
  })

  const { data: backendTranslationsEn } = useGetTranslations('en')
  const { data: backendTranslationsDe } = useGetTranslations('de')

  i18n?.addResourceBundle(
    i18n.language,
    'common',
    i18n.language === 'de' ? backendTranslationsDe : backendTranslationsEn,
    true,
    true
  )

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')

    if (!authToken) router.push('/login')
  }, [user, router])

  function handleLogout(): void {
    logout()

    router.push('/login')
  }

  const pageTitle = `${routeName ? `${routeName} -` : ''} Essencium`

  return (
    <SpotlightProvider
      actions={actions}
      searchPlaceholder={t('header.spotlight.placeholder') as string}
      searchIcon={<IconSearch />}
      highlightQuery
      highlightColor={theme.colors.blue[6]}
      nothingFoundMessage={t('header.spotlight.nothingFound') as string}
    >
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <AppShell
        asideOffsetBreakpoint="sm"
        navbarOffsetBreakpoint="sm"
        navbar={
          <NavBar
            isOpen={openedNav}
            links={NAV_LINKS}
            user={user}
            handleLogout={handleLogout}
          />
        }
        footer={<Footer links={FOOTER_LINKS} />}
        header={
          <Header
            isOpen={openedNav}
            handleOpenNav={handleOpenNav}
            version={packageJson.version}
            user={user}
            logo={
              <Image
                src="/img/web/logotype_400x100px.svg"
                alt={t('header.logo')}
                width={150}
                height={37.5}
                style={{ verticalAlign: 'initial' }}
              />
            }
          />
        }
      >
        {children}
      </AppShell>
    </SpotlightProvider>
  )
}

export default AuthLayout
