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

import { MantineProvider } from '@mantine/core'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PasswordRequirement } from './PasswordRequirement'

describe('PasswordRequirement.tsx', () => {
  it('should the correct label, color and icon if requirement is met', async () => {
    const renderedComponent = render(
      <MantineProvider>
        <PasswordRequirement meets label="label 1" />
      </MantineProvider>,
    )

    const label = screen.getByText('label 1')

    expect(label).toBeDefined()

    expect(label.classList).toContain('_color-validated_fdffd1')

    expect(
      screen.getByLabelText(
        'profileView.dataCard.tabs.passwordChange.passwordStrength.requirements.met',
      ),
    ).toBeDefined()

    renderedComponent.unmount()
  })

  it('should render the correct label, color and icon if requirement is not met', async () => {
    const renderedComponent = render(
      <MantineProvider>
        <PasswordRequirement meets={false} label="label 1" />
      </MantineProvider>,
    )

    const label = screen.getByText('label 1')

    expect(label).toBeDefined()

    expect(label.classList).toContain('_color_fdffd1')

    expect(
      screen.getByLabelText(
        'profileView.dataCard.tabs.passwordChange.passwordStrength.requirements.unmet',
      ),
    ).toBeDefined()

    renderedComponent.unmount()
  })
})
