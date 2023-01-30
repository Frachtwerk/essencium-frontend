import { Grid } from '@mantine/core'

import { ContactForm } from './ContactForm'
import { ContactPersonCard } from './ContactPersonCard'

type ContactPersonProps = {
  contactPersonContent: JSX.Element
}

export function ContactView({ contactPersonContent }: ContactPersonProps) {
  return (
    <Grid>
      <Grid.Col md={4}>
        <ContactPersonCard contactPersonContent={contactPersonContent} />
      </Grid.Col>

      <Grid.Col md={8}>
        <ContactForm />
      </Grid.Col>
    </Grid>
  )
}
