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

import { basePropertiesSchema } from './base'
import { roleOutputSchema } from './role'

const sharedPropertiesSchema = z.object({
  email: z.string().email('validation.email.notValid'),
  enabled: z.boolean(),
  firstName: z.string().min(2, 'validation.firstName.minLength'),
  lastName: z.string().min(2, 'validation.lastName.minLength'),
  locale: z.string(),
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
  .merge(
    z.object({
      role: roleOutputSchema,
    })
  )
  .merge(sharedPropertiesSchema)

export type UserOutput = z.infer<typeof userOutputSchema>

export const userInputSchema = sharedPropertiesSchema.merge(
  z.object({
    password: z.string().optional(),
    role: roleOutputSchema.shape.name.refine(
      role =>
        role !== undefined &&
        roleOutputSchema.shape.name.safeParse(role).success,
      {
        message: 'validation.role.isRequired',
      }
    ),
  })
)

export type UserInput = z.infer<typeof userInputSchema>

export const userUpdateSchema = userOutputSchema.merge(
  z.object({
    password: z.string().optional(),
    role: roleOutputSchema.shape.name.refine(
      role =>
        role !== undefined &&
        roleOutputSchema.shape.name.safeParse(role).success,
      {
        message: 'validation.role.isRequired',
      }
    ),
  })
)

export type UserUpdate = z.infer<typeof userUpdateSchema>

export const passwordChangeSchema = z
  .object({
    verification: z.string().min(8, 'validation.password.minLength'),
    password: z.string().min(8, 'validation.password.minLength'),
    confirmPassword: z.string().min(8, 'validation.password.minLength'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'validation.password.confirmError',
    path: ['confirmPassword'],
  })

export type PasswordChange = z.infer<typeof passwordChangeSchema>

export const loginFormSchema = z.object({
  email: z.string().email('validation.email.notValid'),
  password: z.string().min(8, 'validation.password.minLength'),
})

export type LoginForm = z.infer<typeof loginFormSchema>

export const resetPasswordSchema = z.object({
  email: z.string().email('validation.email.notValid'),
})

export type ResetPassword = z.infer<typeof resetPasswordSchema>

export const setPasswordFormSchema = z
  .object({
    password: z.string().min(8, 'validation.password.minLength'),
    confirmPassword: z.string().min(8, 'validation.password.minLength'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'validation.password.confirmError',
    path: ['confirmPassword'],
  })

export type SetPasswordFormType = z.infer<typeof setPasswordFormSchema>

export type SetPasswordInput = {
  password: string
  verification: string
}
