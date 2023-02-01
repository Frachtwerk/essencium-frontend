import { DocsThemeConfig } from 'nextra-theme-docs'
import React from 'react'

const config: DocsThemeConfig = {
  logo: <span>Essencium Frontend Docs</span>,
  project: {
    link: 'https://github.com/Frachtwerk/essencium-frontend',
  },
  // chat: {
  //   link: 'https://discord.com',
  // },
  docsRepositoryBase:
    'https://github.com/Frachtwerk/essencium-frontend/packages/docs',
  footer: {
    text: 'Essencium Frontend Docs',
  },
}

export default config
