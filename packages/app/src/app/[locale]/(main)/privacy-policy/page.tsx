import { Metadata } from 'next'
import type { JSX } from 'react'

import initTranslations from '@/config/i18n'

import PrivacyPolicy from './PrivacyPolicyView'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { locale } = params

  const { t } = await initTranslations(locale)

  return {
    title: t('privacyPolicy.title'),
  }
}

export default async function page(): Promise<JSX.Element> {
  return <PrivacyPolicy />
}
