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

import { Container, Loader } from '@mantine/core'
import { useEffect, useState } from 'react'

const LoaderVariants = {
  Bars: 'bars',
  Oval: 'oval',
  Dots: 'dots',
} as const

export type LoaderVariantTypeValues =
  (typeof LoaderVariants)[keyof typeof LoaderVariants]

const LoaderSizes = {
  Xs: 'xs',
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
  Xl: 'xl',
} as const

export type LoaderSizeTypeValues =
  (typeof LoaderSizes)[keyof typeof LoaderSizes]

interface Props {
  show: boolean
  delay?: number
  color?: string
  size?: LoaderSizeTypeValues | number
  variant?: LoaderVariantTypeValues
}

export function LoadingSpinner({
  show = false,
  delay = 0,
  color = 'blue',
  size = 'xl',
  variant = 'dots',
}: Props): JSX.Element | null {
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (!show) {
      setShowSpinner(false)
      return
    }

    if (delay === 0) {
      setShowSpinner(true)
    } else {
      timeout = setTimeout(() => setShowSpinner(true), delay)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [show, delay])

  return showSpinner ? (
    <Container
      style={{
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Loader size={size} color={color} variant={variant} name="loader" />
    </Container>
  ) : null
}
