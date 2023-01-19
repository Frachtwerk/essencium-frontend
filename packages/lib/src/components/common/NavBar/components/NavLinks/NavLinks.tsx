import {
  IconHome2,
  IconLanguage,
  IconShieldCheck,
  IconUserCheck,
  IconUsers,
} from '@tabler/icons'
import { useTranslation } from 'react-i18next'

import Link from './components/Link'

function NavLinks() {
  const { t } = useTranslation()

  const data = [
    {
      icon: <IconHome2 size={20} />,
      color: 'blue',
      label: t('navigation.home'),
      href: '/',
    },
    {
      icon: <IconUsers size={20} />,
      color: 'blue',
      label: t('navigation.users'),
      href: '/users',
    },
    {
      icon: <IconUserCheck size={20} />,
      color: 'blue',
      label: t('navigation.roles'),
      href: '/roles',
    },
    {
      icon: <IconShieldCheck size={20} />,
      color: 'blue',
      label: t('navigation.rights'),
      href: '/rights',
    },
    {
      icon: <IconLanguage size={20} />,
      color: 'blue',
      label: t('navigation.translations'),
      href: '/translations',
    },
  ]

  const links = data.map(link => (
    <Link
      icon={link.icon}
      color={link.color}
      label={link.label}
      href={link.href}
      key={link.label}
    />
  ))
  return <div>{links}</div>
}

export default NavLinks
