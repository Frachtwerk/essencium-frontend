import { i18n } from 'translations'
import { z } from 'zod'

const { t } = i18n

export type LoginCredentials = {
  email: string
  password: string
  rememberUser: boolean
}

export const loginFormSchema = z.object({
  email: z.string().email(String(t('validation.email.notValid'))),
  password: z.string().min(8, String(t('validation.password.minLength'))), // TODO: check which backend validation is used
  rememberUser: z.boolean(),
})
