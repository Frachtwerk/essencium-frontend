import { Footer, Header, NavBar } from '@frachtwerk/essencium-lib'
import { FooterLink, NavLink, RIGHTS } from '@frachtwerk/essencium-types'
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
import i18next from 'i18next'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { version } from '../package.json'
import { useInvalidateToken } from './api/auth'
import { useGetMe } from './api/me'
import { useGetTranslations } from './api/translations'
import logoURL from './img/web/icon-512.png'
import { logout } from './utils/logout'

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

function mergeTranslationSources(
  languages: Record<'de' | 'en', Record<string, string> | undefined>
): void {
  Object.entries(languages).forEach(([language, serverTranslations]) => {
    i18next.addResourceBundle(
      language,
      'translation',
      {
        ...serverTranslations,
      },
      true,
      true
    )
  })
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

function App({ children }: AppProps): JSX.Element {
  const navigate = useNavigate()

  const theme = useMantineTheme()

  const { t } = useTranslation()

  const { data: deServerTranslations } = useGetTranslations('de')
  const { data: enServerTranslations } = useGetTranslations('en')

  mergeTranslationSources({
    de: deServerTranslations,
    en: enServerTranslations,
  })

  const [openedNav, setOpenedNav] = useState(false)

  function handleOpenNav(): void {
    setOpenedNav(opened => !opened)
  }

  const { data: user } = useGetMe()

  const { mutate: invalidateToken } = useInvalidateToken(user?.id ?? 0)

  function handleLogout(): void {
    invalidateToken(null, {
      onSuccess: logout,
    })
  }

  const actions: SpotlightAction[] = SEARCH_ITEMS.map(link => {
    return {
      title: t(link.label),
      description: link.description ? (t(link.description) as string) : '',
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
            user={user}
            handleLogout={handleLogout}
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
