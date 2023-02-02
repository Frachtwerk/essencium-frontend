import { Grid } from '@mantine/core'

import { ContactForm } from './components/ContactForm'
import { ContactPersonCard } from './components/ContactPersonCard'

export function ContactView() {
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
