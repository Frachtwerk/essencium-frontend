import { Grid } from '@mantine/core'

type ProfileViewProps = {
  profileData: JSX.Element
  profileOverview: JSX.Element
}

export function ProfileView({
  profileData,
  profileOverview,
}: ProfileViewProps) {
  return (
    <Grid>
      <Grid.Col md={3}>{profileOverview}</Grid.Col>

      <Grid.Col md={9}>{profileData}</Grid.Col>
    </Grid>
  )
}
