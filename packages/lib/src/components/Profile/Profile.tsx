import { Grid } from '@mantine/core'
import { RoleOutput, UserOutput, UserUpate } from 'types'

import { ProfileDataCard, ProfileOverviewCard } from './components'

type Props = {
  user: UserOutput
  roles: RoleOutput[]
  handleUpdate: (data: UserUpate) => void
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
