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

import { Group, Text } from '@mantine/core'
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'
import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '../../utils'

type Props = {
  meets: boolean
  label: string
}

export function PasswordRequirement({ meets, label }: Props): JSX.Element {
  const { t } = useTranslation()

  const textColorClasses = cn(
    'transition-colors duration-500 size-5',
    meets ? 'text-green-700' : 'text-dark',
  )

  return (
    <Group className="mt-xs gap-xs">
      {meets ? (
        <IconCircleCheck
          className={cn('size-5', textColorClasses)}
          aria-label={t(
            'profileView.dataCard.tabs.passwordChange.passwordStrength.requirements.met',
          )}
        />
      ) : (
        <IconCircleX
          className={cn('size-5', textColorClasses)}
          aria-label={t(
            'profileView.dataCard.tabs.passwordChange.passwordStrength.requirements.unmet',
          )}
        />
      )}

      <Text size="sm" className={textColorClasses}>
        {label}
      </Text>
    </Group>
  )
}
