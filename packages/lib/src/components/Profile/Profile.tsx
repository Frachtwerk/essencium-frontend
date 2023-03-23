import { Grid } from '@mantine/core'

import { ProfileDataCard, ProfileOverviewCard } from './components'
import { UserProps } from './types'

export function Profile({
  user,
  roles,
  handleUpdate,
  handlePasswordUpdate,
}: UserProps): JSX.Element {
  return (
    <Grid>
      <Grid.Col md={3}>
        <ProfileOverviewCard
          user={{
            firstName: user.firstName,
            lastName: user.lastName,
            enabled: user.enabled,
            role: {
              name: user.role.name,
            },
          }}
        />
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
