import { z } from 'zod'

import { userRightSchema } from '../Rights'

export const userRoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  rights: userRightSchema.array(),
})
