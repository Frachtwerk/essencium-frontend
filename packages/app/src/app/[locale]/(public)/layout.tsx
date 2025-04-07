'use client'

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

import { Center } from '@mantine/core'
import { type JSX, useEffect } from 'react'
import { getI18n } from 'react-i18next'

import { useAddTranslations } from '@/hooks'

type Props = {
  children: React.ReactNode
}

export default function PublicLayout({ children }: Props): JSX.Element | null {
  const i18n = getI18n()

  const addTranslations = useAddTranslations(i18n)

  useEffect(() => {
    i18n.init(() => {
      addTranslations()
    })
  }, [i18n, addTranslations])

  return <Center>{children}</Center>
}
