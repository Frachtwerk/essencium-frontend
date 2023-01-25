import { Grid, MediaQuery } from '@mantine/core'

import ProfileCardSmall from './ProfilCardSmall'
import ProfileDataCard from './ProfileDataCard'

export default function ProfileView() {
  return (
    <Grid>
      <Grid.Col md={3}>
        <ProfileCardSmall />
      </Grid.Col>
      <Grid.Col md={9}>
        <ProfileDataCard />
      </Grid.Col>
    </Grid>
  )
}
