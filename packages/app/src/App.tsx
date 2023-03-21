import { AppShell, Image, useMantineTheme } from '@mantine/core'
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
import { useNavigate } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'
import type { FooterLink, NavLink } from 'lib'
import { Footer, Header, NavBar } from 'lib'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { authTokenAtom } from '@/api/auth'

import logoURL from './img/web/icon-512.png'

type AppProps = {
  children: React.ReactNode
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
    label: 'navigation.home',
    to: '/',
    description: 'Homepage',
  },
  {
    icon: <IconUsers size={20} />,
    color: 'blue',
    label: 'navigation.users',
    to: '/users',
    description: 'Users',
  },
  {
    icon: <IconUserCheck size={20} />,
    color: 'blue',
    label: 'navigation.roles',
    to: '/roles',
    description: 'User Roles',
  },
  {
    icon: <IconShieldCheck size={20} />,
    color: 'blue',
    label: 'navigation.rights',
    to: '/rights',
    description: 'User Rights',
  },
  {
    icon: <IconLanguage size={20} />,
    color: 'blue',
    label: 'navigation.translations',
    to: '/translations',
    description: 'Translations',
  },
]

export const FOOTER_LINKS: FooterLink[] = [
  {
    icon: <IconShieldLock size={20} />,
    label: 'footer.privacy',
    to: '/',
    description: 'Privacy',
  },
  {
    icon: <IconSectionSign size={20} />,
    label: 'footer.imprint',
    to: '/',
    description: 'Imprint',
  },
  {
    icon: <IconMessage size={20} />,
    label: 'footer.contact',
    to: '/contact',
    description: 'Contact',
  },
]

export const SEARCH_ITEMS: SearchItems[] = [
  ...NAV_LINKS,
  ...FOOTER_LINKS,
  {
    icon: <IconUsers size={20} />,
    label: 'profileView.title',
    to: '/profile',
    description: 'User Profile',
  },
]

function App({ children }: AppProps): JSX.Element {
  const navigate = useNavigate()

  const theme = useMantineTheme()

  const { t } = useTranslation()

  const [openedNav, setOpenedNav] = useState(false)

  function handleOpenNav(): void {
    setOpenedNav(opened => !opened)
  }

  const setAuthToken = useSetAtom(authTokenAtom)

  function handleLogout(): void {
    setAuthToken(null)
    navigate({ to: '/login' })
  }

  const actions: SpotlightAction[] = SEARCH_ITEMS.map(link => {
    return {
      title: t(link.label),
      description: link.description,
      onTrigger: () => navigate({ to: `/${link.to}` }),
      icon: link.icon,
    }
  })

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
            handleLogout={handleLogout}
          />
        }
        footer={<Footer links={FOOTER_LINKS} />}
        header={
          <Header
            isOpen={openedNav}
            handleOpenNav={handleOpenNav}
            logo={
              <Image
                src={logoURL}
                alt="Essencium Logo"
                width="30px"
                height="auto"
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

export default App
