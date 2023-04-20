import { z } from 'zod'

import { basePropertiesSchema } from './base'
import { rightOutputSchema } from './right'

const sharedPropertiesSchema = z.object({
  description: z.string(),
  editable: z.boolean(),
  name: z.string(),
  protected: z.boolean(),
})

export const roleOutputSchema = basePropertiesSchema
  .merge(
    z.object({
      rights: z.array(rightOutputSchema),
    })
  )
  .merge(sharedPropertiesSchema)

export type RoleOutput = z.infer<typeof roleOutputSchema>

export const roleInputSchema = sharedPropertiesSchema
  .merge(
    z.object({
      rights: z.array(rightOutputSchema.shape.id),
    })
  )
  .merge(sharedPropertiesSchema)

export type RoleInput = z.infer<typeof roleInputSchema>
