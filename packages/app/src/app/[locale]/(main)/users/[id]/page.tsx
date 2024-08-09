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

import initTranslations from '@/utils/i18n'

import UpdateUserView from './UpdateUsersView'

type Props = {
  params: { locale: string; id: number }
}

export async function generateMetadata(
  { params }: Props,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = params

  const { t } = await initTranslations(locale)

  return {
    title: t('addUpdateUserView.update.title'),
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function page({ params }: Props): JSX.Element {
  return <UpdateUserView params={params} />
}
