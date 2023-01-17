import * as y from 'yup'

const userSchema = y.object({
  id: y.number().required(),
  name: y.string().required(),
  email: y.string().email().required(),
  username: y.string().optional(),
})

type User = y.InferType<typeof userSchema>

interface Props {
  users: User[]
  shouldLoadApiUsers?: boolean
}

export { userSchema }
export type { Props, User }
