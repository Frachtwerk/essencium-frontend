import { z } from 'zod'

export const basePropertiesSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  createdBy: z.string(),
  updatedAt: z.string(),
  updatedBy: z.string(),
})

export type BaseProperties = z.infer<typeof basePropertiesSchema>
