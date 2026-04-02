import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { JSX } from 'react'

import LegalNoticeView from './LegalNoticeView'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: t('legalNoticeView.title'),
  }
}

export default async function page(): Promise<JSX.Element> {
  return <LegalNoticeView />
}
