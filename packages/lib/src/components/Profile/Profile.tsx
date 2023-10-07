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

import { RoleOutput, UserOutput, UserUpdate } from '@frachtwerk/essencium-types'
import { Grid } from '@mantine/core'

import { ProfileDataCard, ProfileOverviewCard } from './components'

type Props = {
  user: UserOutput
  roles: RoleOutput[]
  handleUpdate: (data: UserUpdate) => void
  handlePasswordUpdate: (oldPassword: string, newPassword: string) => void
}

export function Profile({
  user,
  roles,
  handleUpdate,
  handlePasswordUpdate,
}: Props): JSX.Element {
  return (
    <Grid>
      <Grid.Col md={3}>
        <ProfileOverviewCard user={user} />
      </Grid.Col>

      <Grid.Col md={9}>
        <ProfileDataCard
          user={user}
          roles={roles}
          handleUpdate={handleUpdate}
          handlePasswordUpdate={handlePasswordUpdate}
        />
      </Grid.Col>
    </Grid>
  )
}
