import { DocsThemeConfig } from 'nextra-theme-docs'
import React from 'react'

const config: DocsThemeConfig = {
  logo: <span>Essencium Frontend Docs</span>,
  project: {
    link: 'https://github.com/Frachtwerk/essencium-frontend',
  },
  docsRepositoryBase:
    'https://github.com/Frachtwerk/essencium-frontend/tree/main/packages/docs',
  footer: {
    text: 'Essencium Frontend Docs',
  },
}

export default config
