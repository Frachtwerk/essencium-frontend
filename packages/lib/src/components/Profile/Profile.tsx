import { Grid } from '@mantine/core'

import { ProfileDataCard, ProfileOverviewCard } from './components'

export function Profile(): JSX.Element {
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
