import * as y from 'yup'

export const userSchema = y.object({
  id: y.number().required(),
  name: y.string().required(),
  email: y.string().email().required(),
  username: y.string().optional(),
})

export type User = y.InferType<typeof userSchema>

export type UserProps = {
  users: User[]
  shouldLoadApiUsers?: boolean
}
