import { Grid } from '@mantine/core'

import { ProfileDataCard } from './ProfileDataCard'
import { ProfileOverviewCard } from './ProfilOverviewCard'

export function ProfileView() {
  return (
    <Grid>
      <Grid.Col md={3}>
        <ProfileOverviewCard />
      </Grid.Col>

      <Grid.Col md={9}>
        <ProfileDataCard />
      </Grid.Col>
    </Grid>
  )
}
