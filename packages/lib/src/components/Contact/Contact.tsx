import { Grid } from '@mantine/core'

import { ContactForm, ContactPersonCard } from './components'

export function Contact(): JSX.Element {
  return (
    <Grid>
      <Grid.Col md={4}>
        <ContactPersonCard />
      </Grid.Col>

      <Grid.Col md={8}>
        <ContactForm />
      </Grid.Col>
    </Grid>
  )
}
