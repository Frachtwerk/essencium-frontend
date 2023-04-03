import { Grid } from '@mantine/core'

import { ContactForm, ContactPersonCard } from './components'

export function Contact(): JSX.Element {
  return (
    <Grid role="grid">
      <Grid.Col md={4} role="gridcell">
        <ContactPersonCard />
      </Grid.Col>

      <Grid.Col md={8} role="gridcell">
        <ContactForm />
      </Grid.Col>
    </Grid>
  )
}
