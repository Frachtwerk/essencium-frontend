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
      error:
        'profileView.dataCard.tabs.passwordChange.passwordStrength.validationError',
    },
  )

export const passwordStrengthSchemaUser = passwordStrengthBaseSchema.and(
  z
    .string()
    .min(
      12,
      'profileView.dataCard.tabs.passwordChange.passwordStrength.validationError',
    ),
)

export const passwordStrengthSchemaAdmin = passwordStrengthBaseSchema.and(
  z
    .string()
    .min(
      20,
      'profileView.dataCard.tabs.passwordChange.passwordStrength.validationError',
    ),
)

const passwordChangeBaseSchema = z
  .object({
    verification: stringSchema,

    password: stringSchema,
    confirmPassword: stringSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    error: 'validation.password.confirmError',
    path: ['confirmPassword'],
    when(payload) {
      return passwordChangeBaseSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success
    },
  })

export const passwordChangeSchemaUser = passwordChangeBaseSchema.extend({
  password: passwordStrengthSchemaUser,
})

export type PasswordChange = z.infer<typeof passwordChangeSchemaUser>

export const passwordChangeSchemaAdmin = passwordChangeBaseSchema.extend({
  password: passwordStrengthSchemaAdmin,
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
  })

export type SetPasswordFormType = z.infer<typeof setPasswordFormSchema>

export type SetPasswordInput = {
  password: string
  verification: string
}
