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

import { basePropertiesSchema } from './base'
import { rightOutputSchema } from './right'

export enum ApiTokenStatus {
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
  REVOKED_ROLE_CHANGED = 'REVOKED_ROLE_CHANGED',
  REVOKED_RIGHTS_CHANGED = 'REVOKED_RIGHTS_CHANGED',
  REVOKED_USER_CHANGED = 'REVOKED_USER_CHANGED',
  EXPIRED = 'EXPIRED',
  USER_DELETED = 'USER_DELETED',
}

export const basicRepresentationSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
})

export type BasicRepresentation = z.infer<typeof basicRepresentationSchema>

export const apiTokenOutputSchema = basePropertiesSchema.merge(
  z.object({
    linkedUser: basicRepresentationSchema,
    description: z.string(),
    validUntil: z.string().nullable(),
    status: z.nativeEnum(ApiTokenStatus),
    rights: z.array(rightOutputSchema),
    token: z.string().nullable(),
  }),
)

export type ApiTokenOutput = z.infer<typeof apiTokenOutputSchema>

export const apiTokenInputSchema = z.object({
  description: z.string().min(1, 'validation.description.required'),
  validUntil: z.string().nullable().optional(),
  rights: z.array(z.string()).min(1, 'validation.rights.required'),
})

export type ApiTokenInput = z.infer<typeof apiTokenInputSchema>

export type FilterObjectApiToken = {
  description?: string
  status?: string
  linkedUser?: string
}
