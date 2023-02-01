import { Grid } from '@mantine/core'

import type { ProfileViewProps } from './types'

export function ProfileView({
  PersonalInformation: ProfileDataCard,
  PersonalOverview: ProfileOverviewCard,
}: ProfileViewProps) {
  return (
    <Grid>
      <Grid.Col md={ProfileOverviewCard ? 3 : 12}>
        <ProfileOverviewCard />
      </Grid.Col>

      <Grid.Col md={ProfileDataCard ? 9 : 12}>
        <ProfileDataCard />
      </Grid.Col>
    </Grid>
  )
}
