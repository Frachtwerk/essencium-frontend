/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import { Metadata, ResolvingMetadata } from 'next'
import type { JSX } from 'react'

import initTranslations from '@/config/i18n'

import TranslationsView from './TranslationsView'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(
  props: Props,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params
  const { locale } = params

  const { t } = await initTranslations(locale)

  return {
    title: t('translationsView.title'),
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function page(props: Props): Promise<JSX.Element> {
  const params = await props.params

  const { locale } = params

  const { resources } = await initTranslations(locale)

  return <TranslationsView resources={resources} />
}
