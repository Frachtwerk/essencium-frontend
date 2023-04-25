import { i18n } from 'translations'
import { z } from 'zod'

import { basePropertiesSchema } from './base'
import { roleOutputSchema } from './role'

const { t } = i18n

const sharedPropertiesSchema = z.object({
  email: z.string().email(String(t('validation.email.notValid'))),
  enabled: z.boolean(),
  firstName: z.string().min(2, String(t('validation.firstName.minLength'))),
  lastName: z.string().min(2, String(t('validation.lastName.minLength'))),
  locale: z.string(),
  mobile: z
    .string()
    .nullable()
    .transform(value => (value === null ? undefined : value)),
  phone: z
    .string()
    .nullable()
    .transform(value => (value === null ? undefined : value)),
  source: z.string(),
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
    role: roleOutputSchema.shape.id.refine(
      role =>
        role !== undefined && roleOutputSchema.shape.id.safeParse(role).success,
      {
        message: String(t('validation.role.isRequired')),
      }
    ),
  })
)

export type UserInput = z.infer<typeof userInputSchema>

export const userUpdateSchema = userOutputSchema.merge(
  z.object({
    password: z.string().optional(),
    role: roleOutputSchema.shape.id.refine(
      role =>
        role !== undefined && roleOutputSchema.shape.id.safeParse(role).success,
      {
        message: String(t('validation.role.isRequired')),
      }
    ),
  })
)

export type UserUpdate = z.infer<typeof userUpdateSchema>

export const passwordChangeSchema = z
  .object({
    verification: z.string().min(8, String(t('validation.password.minLength'))),
    password: z.string().min(8, String(t('validation.password.minLength'))),
    confirmPassword: z
      .string()
      .min(8, String(t('validation.password.minLength'))),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: String(t('validation.password.confirmError')),
    path: ['confirmPassword'],
  })

export type PasswordChange = z.infer<typeof passwordChangeSchema>

export const loginFormSchema = z.object({
  email: z.string().email(String(t('validation.email.notValid'))),
  password: z.string().min(8, String(t('validation.password.minLength'))),
  rememberUser: z.boolean(),
})

export type LoginForm = z.infer<typeof loginFormSchema>
