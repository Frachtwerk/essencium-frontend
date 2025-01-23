'use client'

import { createInstance, Resource } from 'i18next'
import React, { type JSX, PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'

import initTranslations from '@/config/i18n'

interface TranslationProviderProps {
  locale: string
  resources: Resource
}

export default function TranslationProvider({
  children,
  locale,
  resources,
}: PropsWithChildren<TranslationProviderProps>): JSX.Element {
  const i18n = createInstance()

  initTranslations(locale, i18n, resources)

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
