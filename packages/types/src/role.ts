import { z } from 'zod'

import { basePropertiesSchema } from './base'
import { rightOutputSchema } from './right'

const sharedPropertiesSchema = z.object({
  description: z.string().min(8, 'validation.roleDescription.minLength'),
  editable: z.boolean(),
  name: z.string().min(2, 'validation.roleName.minLength'),
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

export const roleInputSchema = sharedPropertiesSchema.merge(
  z.object({
    rights: z.array(rightOutputSchema.shape.id),
  })
)

export type RoleInput = z.infer<typeof roleInputSchema>

export const roleUpdateSchema = roleOutputSchema.merge(
  z.object({
    rights: z.array(rightOutputSchema.shape.id),
  })
)

export type RoleUpdate = z.infer<typeof roleUpdateSchema>
