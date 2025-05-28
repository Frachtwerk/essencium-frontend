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

'use client'

import { PasswordStrengthRules } from '@frachtwerk/essencium-types'
import { Popover, PopoverProps } from '@mantine/core'
import { type JSX, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PasswordRequirement } from './PasswordRequirement'

type Props = {
  passwordValue: string | null
  isAdmin?: boolean
  children: JSX.Element
} & PopoverProps

type PasswordRequirementType = {
  id: string
  requirement: RegExp
  label: string
}[]

export function PasswordStrengthIndicator({
  isAdmin,
  passwordValue,
  children,
  ...popoverProps
}: Props): JSX.Element {
  const { t } = useTranslation()

  const [popoverOpened, setPopoverOpened] = useState(false)

  const passwordRequirements: PasswordRequirementType = [
    ...Object.entries(PasswordStrengthRules).map(([key, value]) => {
      return {
        id: key,
        requirement: value,
        label: t(
          `profileView.dataCard.tabs.passwordChange.passwordStrength.${key}`,
        ),
      }
    }),
    {
      id: 'length',
      requirement: isAdmin ? /.{20,}/ : /.{12,}/,
      label: t(
        'profileView.dataCard.tabs.passwordChange.passwordStrength.length',
        { passwordLength: isAdmin ? 20 : 12 },
      ),
    },
  ]

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: 'pop' }}
      {...popoverProps}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          {children}
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        {passwordRequirements.map(requirement => (
          <PasswordRequirement
            key={requirement.id}
            label={requirement.label}
            meets={requirement.requirement.test(passwordValue || '')}
          />
        ))}
      </Popover.Dropdown>
    </Popover>
  )
}
