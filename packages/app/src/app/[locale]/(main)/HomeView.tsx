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

'use client'

import { hasRequiredRights, Home } from '@frachtwerk/essencium-lib'
import { RIGHTS } from '@frachtwerk/essencium-types'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import type { JSX } from 'react'

import { userRightsAtom } from '@/api'

export default function HomeView(): JSX.Element {
  const router = useRouter()

  const userRights = useAtomValue(userRightsAtom)

  function handleButtonClick(path: string): void {
    router.push(path)
  }

  const showUsersPageButton = hasRequiredRights(userRights, RIGHTS.USER_READ)

  return (
    <Home
      onClickButton={handleButtonClick}
      showUsersPageButton={showUsersPageButton}
    />
  )
}
