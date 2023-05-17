import { RoleOutput, UserOutput, UserUpdate } from '@frachtwerk/types'
import { Grid } from '@mantine/core'

import { ProfileDataCard, ProfileOverviewCard } from './components'

type Props = {
  user: UserOutput
  roles: RoleOutput[]
  handleUpdate: (data: UserUpdate) => void
  handlePasswordUpdate: (oldPassword: string, newPassword: string) => void
}

export function Profile({
  user,
  roles,
  handleUpdate,
  handlePasswordUpdate,
}: Props): JSX.Element {
  return (
    <Grid>
      <Grid.Col md={3}>
        <ProfileOverviewCard user={user} />
      </Grid.Col>

      <Grid.Col md={9}>
        <ProfileDataCard
          user={user}
          roles={roles}
          handleUpdate={handleUpdate}
          handlePasswordUpdate={handlePasswordUpdate}
        />
      </Grid.Col>
    </Grid>
  )
}
