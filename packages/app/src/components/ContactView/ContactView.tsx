import { Grid } from '@mantine/core'

import { ContactForm } from './ContactForm'
import { ContactPersonCard } from './ContactPersonCard'

type ContactPersonProps = {
  contactPersonCard: JSX.Element
}

export function ContactView({ contactPersonCard }: ContactPersonProps) {
  return (
    <Grid>
      <Grid.Col md={4}>{contactPersonCard}</Grid.Col>

      <Grid.Col md={8}>
        <ContactForm />
      </Grid.Col>
    </Grid>
  )
}
