/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import { Grid } from '@mantine/core'

import { ContactForm, ContactFormType, ContactPersonCard } from './components'

type Props = {
  onSubmit: (form: ContactFormType) => void
}

export function Contact({ onSubmit }: Props): JSX.Element {
  return (
    <Grid role="grid">
      <Grid.Col md={4} role="gridcell">
        <ContactPersonCard />
      </Grid.Col>

      <Grid.Col md={8} role="gridcell">
        <ContactForm onSubmit={onSubmit} />
      </Grid.Col>
    </Grid>
  )
}
