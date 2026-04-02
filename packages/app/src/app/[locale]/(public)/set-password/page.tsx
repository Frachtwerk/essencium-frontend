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
import { getTranslations } from 'next-intl/server'
import type { JSX } from 'react'
import { Suspense } from 'react'

import SetPasswordView from './SetPasswordView'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props: Props,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: t('setPasswordView.title'),
  }
}

export default async function page(): Promise<JSX.Element> {
  return (
    <Suspense fallback={null}>
      <SetPasswordView />
    </Suspense>
  )
}
