import { z } from 'zod'

export const basicEntityOutputSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export type BasicEntityOutput = z.infer<typeof basicEntityOutputSchema>
