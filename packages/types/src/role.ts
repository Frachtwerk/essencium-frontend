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
import { rightOutputSchema } from './right'

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const

const sharedPropertiesSchema = z.object({
  description: stringSchema,
  editable: z.boolean(),
  name: z.string().min(2, 'validation.roleName.minLength'),
  protected: z.boolean(),
})

export const roleOutputSchema = sharedPropertiesSchema.extend({
  rights: z.array(rightOutputSchema),
})

export type RoleOutput = z.infer<typeof roleOutputSchema>

export const roleInputSchema = sharedPropertiesSchema.extend({
  rights: z.array(rightOutputSchema.shape.authority),
})

export type RoleInput = z.infer<typeof roleInputSchema>
