import { AppShell } from '@mantine/core'
import type { SpotlightAction } from '@mantine/spotlight'
import { SpotlightProvider } from '@mantine/spotlight'
import {
  IconHome2,
  IconLanguage,
  IconSearch,
  IconShieldCheck,
  IconUserCheck,
  IconUsers,
} from '@tabler/icons'
import { useNavigate } from '@tanstack/react-router'
import type { FooterLink, NavLink } from 'lib'
import { Footer, Header, NavBar } from 'lib'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type AppProps = {
  children: React.ReactNode
}

export const NAV_LINKS: NavLink[] = [
  {
    icon: <IconHome2 size={20} />,
    color: 'blue',
    label: 'navigation.home',
    to: '/',
    description: 'Lorem Ipsum',
  },
  {
    icon: <IconUsers size={20} />,
    color: 'blue',
    label: 'navigation.users',
    to: '/users',
    description: 'Lorem Ipsum',
  },
  {
    icon: <IconUserCheck size={20} />,
    color: 'blue',
    label: 'navigation.roles',
    to: '/roles',
    description: 'Lorem Ipsum',
  },
  {
    icon: <IconShieldCheck size={20} />,
    color: 'blue',
    label: 'navigation.rights',
    to: '/rights',
    description: 'Lorem Ipsum',
  },
  {
    icon: <IconLanguage size={20} />,
    color: 'blue',
    label: 'navigation.translations',
    to: '/translations',
    description: 'Lorem Ipsum',
  },
]

export const FOOTER_LINKS: FooterLink[] = [
  {
    label: 'footer.privacy',
    to: '/',
  },
  {
    label: 'footer.imprint',
    to: '/',
  },
  {
    label: 'footer.contact',
    to: '/contact',
  },
]

function App({ children }: AppProps) {
  const [openedNav, setOpenedNav] = useState(false)

  function handleOpenNav(): void {
    setOpenedNav(o => !o)
  }

  const navigate = useNavigate()

  const { t } = useTranslation()

  const actions: SpotlightAction[] = NAV_LINKS.map(link => {
    return {
      title: t(link.label),
      description: link.description,
      onTrigger: () => navigate({ to: `/${link.to}` }),
      icon: link.icon,
    }
  })

  return (
    <AppShell
      asideOffsetBreakpoint="sm"
      navbarOffsetBreakpoint="sm"
      navbar={<NavBar isOpen={openedNav} links={NAV_LINKS} />}
      footer={<Footer links={FOOTER_LINKS} />}
      header={
        <Header isOpen={openedNav} handleOpenNav={() => handleOpenNav()} />
      }
    >
      <SpotlightProvider
        actions={actions}
        searchPlaceholder="Search..."
        searchIcon={<IconSearch size={18} />}
        highlightQuery
      />

      {children}
    </AppShell>
  )
}

export default App
