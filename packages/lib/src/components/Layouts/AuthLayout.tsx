import {
  FooterLink,
  NavLink,
  RIGHTS,
  UserOutput,
} from '@frachtwerk/essencium-types'
import { AppShell, useMantineTheme } from '@mantine/core'
import type { SpotlightAction } from '@mantine/spotlight'
import { SpotlightProvider } from '@mantine/spotlight'
import {
  IconHome2,
  IconLanguage,
  IconMessage,
  IconSearch,
  IconSectionSign,
  IconShieldCheck,
  IconShieldLock,
  IconUserCheck,
  IconUsers,
} from '@tabler/icons-react'
import { UseQueryResult } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'

import { Footer } from '../Footer'
import { Header } from '../Header'
import { NavBar } from '../NavBar'

type Props = {
  children: React.ReactNode
  version?: string
  logout: () => void
  useGetMe: () => UseQueryResult<UserOutput, unknown>
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
    icon: <IconHome2 size={20} />,
    color: 'blue',
    label: 'navigation.home.label',
    to: '/',
    description: 'navigation.home.description',
    rights: [],
  },
  {
    icon: <IconUsers size={20} />,
    color: 'blue',
    label: 'navigation.users.label',
    to: '/users',
    description: 'navigation.users.description',
    rights: [RIGHTS.USER_READ],
  },
  {
    icon: <IconUserCheck size={20} />,
    color: 'blue',
    label: 'navigation.roles.label',
    to: '/roles',
    description: 'navigation.roles.description',
    rights: [RIGHTS.ROLE_READ, RIGHTS.RIGHT_READ],
  },
  {
    icon: <IconShieldCheck size={20} />,
    color: 'blue',
    label: 'navigation.rights.label',
    to: '/rights',
    description: 'navigation.rights.description',
    rights: [RIGHTS.ROLE_READ, RIGHTS.RIGHT_READ],
  },
  {
    icon: <IconLanguage size={20} />,
    color: 'blue',
    label: 'navigation.translations.label',
    to: '/translations',
    description: 'navigation.translations.description',
    rights: [RIGHTS.TRANSLATION_READ],
  },
]

export const FOOTER_LINKS: FooterLink[] = [
  {
    icon: <IconShieldLock size={20} />,
    label: 'footer.privacy.label',
    to: '/',
    description: 'footer.privacy.description',
  },
  {
    icon: <IconSectionSign size={20} />,
    label: 'footer.imprint.label',
    to: '/',
    description: 'footer.imprint.description',
  },
  {
    icon: <IconMessage size={20} />,
    label: 'footer.contact.label',
    to: '/contact',
    description: 'footer.contact.description',
  },
]

export const SEARCH_ITEMS: SearchItems[] = [
  ...NAV_LINKS,
  ...FOOTER_LINKS,
  {
    icon: <IconUsers size={20} />,
    label: 'profileView.title',
    to: '/profile',
    description: 'profileView.description',
  },
]

export function AuthLayout({
  children,
  version,
  logout,
  useGetMe,
}: Props): JSX.Element | null {
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

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')

    if (!authToken) router.push('/login')
  }, [user, router])

  return (
    <SpotlightProvider
      actions={actions}
      searchPlaceholder={t('header.spotlight.placeholder') as string}
      searchIcon={<IconSearch size={18} />}
      highlightQuery
      highlightColor={theme.colors.blue[6]}
      nothingFoundMessage={t('header.spotlight.nothingFound') as string}
    >
      <AppShell
        asideOffsetBreakpoint="sm"
        navbarOffsetBreakpoint="sm"
        navbar={
          <NavBar
            isOpen={openedNav}
            links={NAV_LINKS}
            user={user}
            handleLogout={logout}
          />
        }
        footer={<Footer links={FOOTER_LINKS} />}
        header={
          <Header
            isOpen={openedNav}
            handleOpenNav={handleOpenNav}
            version={version}
            user={user}
            logo={
              <Image
                src="/img/web/icon-192.png"
                alt="Essencium Logo"
                width={30}
                height={30}
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
