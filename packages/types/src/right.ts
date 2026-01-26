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

import { z } from 'zod'

import { stringSchema } from './base'

export const RIGHTS = {
  API_DEVELOPER: 'API_DEVELOPER',

  RIGHT_READ: 'RIGHT_READ',
  RIGHT_UPDATE: 'RIGHT_UPDATE',

  ROLE_CREATE: 'ROLE_CREATE',
  ROLE_READ: 'ROLE_READ',
  ROLE_UPDATE: 'ROLE_UPDATE',
  ROLE_DELETE: 'ROLE_DELETE',

  TRANSLATION_CREATE: 'TRANSLATION_CREATE',
  TRANSLATION_READ: 'TRANSLATION_READ',
  TRANSLATION_UPDATE: 'TRANSLATION_UPDATE',
  TRANSLATION_DELETE: 'TRANSLATION_DELETE',

  USER_CREATE: 'USER_CREATE',
  USER_READ: 'USER_READ',
  USER_UPDATE: 'USER_UPDATE',
  USER_DELETE: 'USER_DELETE',
} as const

export const rightOutputSchema = z.object({
  authority: stringSchema,
  description: z.string().nullable(),
})

export type RightOutput = z.infer<typeof rightOutputSchema>
