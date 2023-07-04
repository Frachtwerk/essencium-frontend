import { z } from 'zod'

import { basePropertiesSchema } from './base'

export enum RIGHTS {
  API_DEVELOPER = 'API_DEVELOPER',

  RIGHT_READ = 'RIGHT_READ',
  RIGHT_UPDATE = 'RIGHT_UPDATE',

  ROLE_CREATE = 'ROLE_CREATE',
  ROLE_READ = 'ROLE_READ',
  ROLE_UPDATE = 'ROLE_UPDATE',
  ROLE_DELETE = 'ROLE_DELETE',

  TRANSLATION_CREATE = 'TRANSLATION_CREATE',
  TRANSLATION_READ = 'TRANSLATION_READ',
  TRANSLATION_UPDATE = 'TRANSLATION_UPDATE',
  TRANSLATION_DELETE = 'TRANSLATION_DELETE',

  USER_CREATE = 'USER_CREATE',
  USER_READ = 'USER_READ',
  USER_UPDATE = 'USER_UPDATE',
  USER_DELETE = 'USER_DELETE',
}

export const rightOutputSchema = basePropertiesSchema.pick({ id: true }).merge(
  z.object({
    name: z.string(),
    description: z.string(),
  })
)

export type RightOutput = z.infer<typeof rightOutputSchema>

export type TestType = true
