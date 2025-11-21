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

export const PasswordStrengthRules = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  specialCharacter: /[!@#§$%^&*(),.?":{}|<>[\]\\';'/`~+=_-]/,
} as const

export const passwordStrengthBaseSchema = z
  .string()
  .refine(
    password =>
      PasswordStrengthRules.uppercase.test(password) &&
      PasswordStrengthRules.lowercase.test(password) &&
      PasswordStrengthRules.number.test(password) &&
      PasswordStrengthRules.specialCharacter.test(password),
    {
      error: 'validation.password.strength',
    },
  )

export const passwordStrengthSchemaUser = passwordStrengthBaseSchema.and(
  z.string().min(12, 'validation.password.minLengthUser'),
)

export const passwordStrengthSchemaAdmin = passwordStrengthBaseSchema.and(
  z.string().min(20, 'validation.password.minLengthAdmin'),
)

const passwordChangeBaseSchema = z.object({
  verification: stringSchema,

  password: stringSchema,
  confirmPassword: stringSchema,
})

export const passwordChangeSchemaUser = passwordChangeBaseSchema
  .extend({
    password: passwordStrengthSchemaUser,
  })
  .refine(data => data.password === data.confirmPassword, {
    error: 'validation.password.confirmError',
    path: ['confirmPassword'],
    when(payload) {
      return passwordChangeSchemaUser
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success
    },
  })

export type PasswordChange = z.infer<typeof passwordChangeSchemaUser>

export const passwordChangeSchemaAdmin = passwordChangeBaseSchema
  .extend({
    password: passwordStrengthSchemaAdmin,
  })
  .refine(data => data.password === data.confirmPassword, {
    error: 'validation.password.confirmError',
    path: ['confirmPassword'],
    when(payload) {
      return passwordChangeSchemaAdmin
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success
    },
  })

export type PasswordChangeAdmin = z.infer<typeof passwordChangeSchemaAdmin>

export const loginFormSchema = z.object({
  email: z.email(),
  password: stringSchema,
})

export type LoginForm = z.infer<typeof loginFormSchema>

export const resetPasswordSchema = z.object({
  email: z.email(),
})

export type ResetPassword = z.infer<typeof resetPasswordSchema>

export const setPasswordFormSchema = z
  .object({
    password: z.string().min(8, 'validation.password.minLength'),
    confirmPassword: z.string().min(8, 'validation.password.minLength'),
  })
  .refine(data => data.password === data.confirmPassword, {
    error: 'validation.password.confirmError',
    path: ['confirmPassword'],
    when(payload) {
      return passwordChangeSchemaAdmin
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success
    },
  })

export type SetPasswordFormType = z.infer<typeof setPasswordFormSchema>

export type SetPasswordInput = {
  password: string
  verification: string
}
