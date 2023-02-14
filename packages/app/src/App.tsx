import { AppShell } from '@mantine/core'
import {
  IconHome2,
  IconLanguage,
  IconShieldCheck,
  IconUserCheck,
  IconUsers,
} from '@tabler/icons'
import type { NavLink } from 'lib'
import { Footer, Header, NavBar } from 'lib'
import type { FooterLink } from 'lib/src/components/Footer/types'
import { useState } from 'react'

type AppProps = {
  children: React.ReactNode
}

export const NAV_LINKS: NavLink[] = [
  {
    icon: <IconHome2 size={20} />,
    color: 'blue',
    label: 'navigation.home',
    to: '/home',
  },
  {
    icon: <IconUsers size={20} />,
    color: 'blue',
    label: 'navigation.users',
    to: '/users',
  },
  {
    icon: <IconUserCheck size={20} />,
    color: 'blue',
    label: 'navigation.roles',
    to: '/roles',
  },
  {
    icon: <IconShieldCheck size={20} />,
    color: 'blue',
    label: 'navigation.rights',
    to: '/rights',
  },
  {
    icon: <IconLanguage size={20} />,
    color: 'blue',
    label: 'navigation.translations',
    to: '/translations',
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
      {children}
    </AppShell>
  )
}

export default App
