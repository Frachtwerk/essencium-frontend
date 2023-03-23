import { ColumnDef } from '@tanstack/react-table'
import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
})

export type UserDummy = z.infer<typeof userSchema>

export type UserTableProps = {
  users: UserDummy[]
  columns: ColumnDef<UserDummy>[]
}
