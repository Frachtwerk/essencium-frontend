import { Grid } from '@mantine/core'

import { ContactPersonCard } from './components/components/ContactPersonCard'
import { ContactForm } from './components/ContactForm'

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
