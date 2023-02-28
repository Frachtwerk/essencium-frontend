import { useRouter } from 'next/router'
import { DocsThemeConfig } from 'nextra-theme-docs'
import React from 'react'

const config: DocsThemeConfig = {
  logo: (
    <>
      <img
        src="/icon-512.png"
        alt="Essencium Logo"
        width="25px"
        height="auto"
      />
      <span style={{ marginLeft: '.4em', fontWeight: 800 }}>
        Essencium Docs
      </span>
    </>
  ),
  head: function useHead() {
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </>
    )
  },
  project: {
    link: 'https://github.com/Frachtwerk/essencium-frontend',
  },
  docsRepositoryBase:
    'https://github.com/Frachtwerk/essencium-frontend/tree/main/packages/docs',
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – Essencium',
      }
    }
    return {
      titleTemplate: 'Introduction - Essencium',
    }
  },
  footer: {
    text: 'Essencium Docs',
  },
}

export default config
