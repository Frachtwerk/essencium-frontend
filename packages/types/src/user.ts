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
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import { z } from 'zod'

import {
  passwordStrengthBaseSchema,
  passwordStrengthSchemaAdmin,
  passwordStrengthSchemaUser,
} from './auth'
import { baseInputSchema, basePropertiesSchema, stringSchema } from './base'
import { roleOutputSchema, ROLES } from './role'

export enum UserSource {
  LOCAL = 'local',
}

const sharedPropertiesSchema = z.object({
  email: z.email(),
  enabled: z.boolean(),
  firstName: z.string().min(2, 'validation.firstName.minLength'),
  lastName: z.string().min(2, 'validation.lastName.minLength'),
  locale: stringSchema,
  mobile: z
    .string()
    .nullable()
    .transform(value => (value === null ? '' : value)),
  phone: z
    .string()
    .nullable()
    .transform(value => (value === null ? '' : value)),
})

export const userOutputSchema = basePropertiesSchema
  .extend({
    roles: z.array(roleOutputSchema),
    source: z.union([z.literal(UserSource.LOCAL), stringSchema]),
  })
  .extend(sharedPropertiesSchema.shape)

export type UserOutput = z.infer<typeof userOutputSchema>

export const userInputSchema = baseInputSchema
  .extend({
    password: passwordStrengthBaseSchema.or(z.literal('')).optional(),
    roles: z
      .array(roleOutputSchema.shape.name)
      .min(1, 'validation.role.isRequired'),
  })
  .extend(sharedPropertiesSchema.shape)
  .refine(
    data => {
      if (!data.password) return true

      if (data.roles.includes(ROLES.ADMIN)) {
        return passwordStrengthSchemaAdmin.safeParse(data.password).success
      }
      return passwordStrengthSchemaUser.safeParse(data.password).success
    },
    {
      path: ['password'],
      error: iss => {
        const data = iss.input as z.infer<typeof userInputSchema>

        if (data.roles.includes(ROLES.ADMIN)) {
          return 'validation.password.minLengthAdmin'
        }
        return 'validation.password.minLengthUser'
      },
      when(payload) {
        return userInputSchema
          .pick({ roles: true, password: true })
          .safeParse(payload.value).success
      },
    },
  )

export type UserInput = z.infer<typeof userInputSchema>
